{-
Copyright 2025 Takuro Okada.
Released under the MIT License.
-}

module Main ( main ) where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web (get, post, printError)
import Calendar (createCalender, getCalendarResult)
import Data.Argonaut.Core (toObject)
import Data.Argonaut.Core as JSON
import Data.Array (elem, filter, foldM)
import Data.DateTime (adjust, month, year)
import Data.Either (Either(..), fromRight)
import Data.Enum (toEnum)
import Data.Foldable (traverse_)
import Data.Formatter.DateTime (formatDateTime)
import Data.HashMap (lookup)
import Data.HashMap as HashMap
import Data.Int (fromString, round)
import Data.Maybe (Maybe(..), maybe)
import Data.String (Pattern(..), split)
import Data.Time.Duration (negateDuration)
import Data.Traversable (traverse)
import Data.TraversableWithIndex (traverseWithIndex)
import Data.Tuple (Tuple(..), fst, snd)
import DomUtils (elementParameters, htmlTag)
import Effect (Effect)
import Effect.Aff (runAff_)
import Effect.Class.Console as Console
import Effect.Exception as Exception
import Effect.Now (getTimezoneOffset, nowDate, nowDateTime)
import Foreign.Object (isEmpty)
import Foreign.Object as Object
import JsonUtils (getArrayFromObject, getNumberFromObject, getObjectFromObject, getStringArrayFromObject, getStringFromObject, getStringHashMapFromObject)
import Web.DOM.DOMTokenList as DOMTokenList
import Web.DOM.Document as Document
import Web.DOM.Element (Element, classList, fromEventTarget, fromNode, setAttribute, toEventTarget, toNode, toParentNode)
import Web.DOM.Node (Node, appendChild, textContent)
import Web.DOM.NodeList as NodeList
import Web.DOM.ParentNode (QuerySelector(..), querySelector, querySelectorAll)
import Web.Event.Event as Event
import Web.Event.EventTarget (addEventListener, eventListener)
import Web.Event.Internal.Types as Types
import Web.HTML (window)
import Web.HTML.Event.EventTypes (click, domcontentloaded)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLInputElement as HTMLInputElement
import Web.HTML.HTMLTextAreaElement as HTMLTextAreaElement
import Web.HTML.Location (reload)
import Web.HTML.Window (document, innerHeight, innerWidth, location, scrollY)

contextPath :: String
contextPath = "http://localhost:3000"

main :: Effect Unit
main = do
    win <- window
    doc <- document win
    handler <- eventListener domReadyHandler
    addEventListener domcontentloaded handler false (Document.toEventTarget $ toDocument doc)

domReadyHandler :: Types.Event -> Effect Unit
domReadyHandler _ = do
    mainContents <- loadMainContents
    body <- window >>= document >>= toDocument >>> Document.toParentNode >>> querySelector (QuerySelector "body")
    case body of
        Nothing -> Console.error "No body element found."
        Just bodyElement -> appendChild (toNode mainContents) (toNode bodyElement)

loadMainContents :: Effect Element
loadMainContents = do
    mainContents <- htmlTag elementParameters { 
        tagName = "div", 
        classes = Just ["main"]
    }

    contents <- htmlTag elementParameters { 
        tagName = "div"
    }
    appendChild (toNode contents) (toNode mainContents)

    getContentsSetting (\json -> do
        let setting = maybe Object.empty identity $ toObject json

        header <- htmlTag elementParameters { 
            tagName = "div", 
            style = Just "text-align: center;"
        }
        appendChild (toNode header) (toNode contents)

        let imageSetting = getObjectFromObject "image" setting
        if not (isEmpty imageSetting) then do
            let imagePath = getStringFromObject "path" "" imageSetting
            let width = getNumberFromObject "width" 0.0 imageSetting
            let height = getNumberFromObject "height" 0.0 imageSetting
            htmlTag elementParameters { 
                tagName = "div", 
                style = Just ("height: " <> (show height) <> "px; background-image: url(" <> imagePath <> "); background-position: center 0; background-size: " <> (show width) <> "px " <> (show height) <> "px; background-repeat: no-repeat; margin: 0 0 32px 0;")
            } >>= \element -> appendChild (toNode element) (toNode header)
        else pure unit

        let title = getStringFromObject "title" "" setting
        htmlTag elementParameters { 
            tagName = "h1", 
            style = Just "font-size: large; font-weight: 600; margin-bottom: 8px;", 
            contents = Just title
        } >>= \element -> appendChild (toNode element) (toNode header)
        
        let notes = getStringFromObject "notes" "" setting
        traverse_ (\entry -> do
            htmlTag elementParameters { 
                tagName = "p", 
                style = Just "font-size: small; color: gray; margin-bottom: 8px;", 
                contents = Just entry
            } >>= \element -> appendChild (toNode element) (toNode header)
        ) (split (Pattern "\n") notes)
        
        let questions = getArrayFromObject "questions" setting
        traverse_ (\entry -> do
            let object = maybe Object.empty identity $ toObject entry
            loadForm formParameters { 
                title = getStringFromObject "question" "" object,
                formType = formTypeFromString $ getStringFromObject "formType" "" object,
                selection = Just $ getStringArrayFromObject "selection" object,
                constraints = Just $ getStringArrayFromObject "constraints" object,
                attributes = Just $ getStringHashMapFromObject "attributes" object
            } >>= \element -> appendChild (toNode element) (toNode contents)
        ) questions
        
        let answerSetting = getObjectFromObject "answer" setting
        let buttonLabel = getStringFromObject "button" "" answerSetting
        let message = getStringFromObject "message" "" answerSetting

        controls <- htmlTag elementParameters { 
            tagName = "div", 
            style = Just "text-align: center;"
        }
        appendChild (toNode controls) (toNode mainContents)

        applyButton <- htmlTag elementParameters { 
            tagName = "button", 
            classes = Just ["applyButton"], 
            contents = Just buttonLabel
        }
        appendChild (toNode applyButton) (toNode controls)

        eventListener (\_ -> do
            inputNodeList <- window >>= document >>= toDocument >>> Document.toParentNode >>> querySelectorAll (QuerySelector "input, textarea")
            inputList <- NodeList.toArray inputNodeList
            valid <- foldM (\result inputNode -> 
                if result then
                    case HTMLInputElement.fromNode inputNode of 
                        Just inputElement -> do
                            validity <- HTMLInputElement.checkValidity inputElement
                            if not validity then do
                                _ <- HTMLInputElement.reportValidity inputElement
                                pure validity
                            else pure validity
                        Nothing -> pure true
                else pure false
            ) true inputList
            if valid then do
                nodeList <- window >>= document >>= toDocument >>> Document.toParentNode >>> querySelectorAll (QuerySelector "div.question")
                answers <- NodeList.toArray nodeList >>= convertViewToModel
                dateTime <- getCurrentDateTimeString
                let requestBody = JSON.fromObject $ Object.fromFoldable [ 
                    (Tuple "date" $ JSON.fromString $ maybe "" identity dateTime), 
                    (Tuple "answers" $ JSON.fromArray answers)
                ]
                runAff_ 
                    (\result -> case result of
                        Left error -> Console.error $ Exception.message error
                        Right _result -> case _result of
                            Left error -> Console.error $ printError error
                            Right _ -> showThanks message
                    ) (post ResponseFormat.string (contextPath <> "/answer") $ Just $ RequestBody.json $ requestBody)
            else pure unit
        ) >>= \listener -> addEventListener click listener false (toEventTarget applyButton)
    )

    pure mainContents

showThanks :: String -> Effect Unit
showThanks message = do
    scrollY <- window >>= scrollY
    windowWidth <- window >>= innerWidth
    windowHeight <- window >>= innerHeight
    let width = 300
    let height = 160
    let x = (windowWidth - width)/2
    let y = round scrollY + (windowHeight - width)/2
    body <- window >>= document >>= toDocument >>> Document.toParentNode >>> querySelector (QuerySelector "body")
    case body of
        Nothing -> Console.error "No body element found."
        Just bodyElement -> do
            frame <- htmlTag elementParameters { 
                tagName = "div", 
                classes = Just ["dialog"],
                style = Just $ "left:" <> show x <> "px; top:" <> show y <> "px; width:" <> show width <> "px; height:" <> show height <> "px;" 
            }
            appendChild (toNode frame) (toNode bodyElement)

            headline <- htmlTag elementParameters { 
                tagName = "div", 
                style = Just "font-weight: 600;",
                contents = Just message
            }
            appendChild (toNode headline) (toNode frame)

            controls <- htmlTag elementParameters { 
                tagName = "div", 
                style = Just "text-align: center; margin: 16px 0;"
            }
            appendChild (toNode controls) (toNode frame)

            applyButton <- htmlTag elementParameters { 
                tagName = "button", 
                classes = Just ["applyButton"], 
                contents = Just "OK" 
            }
            listener <- eventListener (\_ -> 
                window >>= location >>= reload
            )
            addEventListener click listener false (toEventTarget applyButton)
            appendChild (toNode applyButton) (toNode controls)

getCurrentDateTimeString :: Effect (Maybe String)
getCurrentDateTimeString = do
    dateTime <- nowDateTime
    minutes <- getTimezoneOffset
    case adjust (negateDuration minutes) dateTime of
        Nothing -> pure Nothing
        Just adjustedDateTime -> 
            case formatDateTime "YYYY-MM-DDTHH:mm:ss" adjustedDateTime of
                Left _ -> pure Nothing
                Right string -> pure $ Just string

getContentsSetting :: (JSON.Json -> Effect Unit) -> Effect Unit
getContentsSetting jsonHandler = runAff_ (\result -> case result of
    Left error -> Console.error $ Exception.message error
    Right _result -> case _result of
        Left error -> Console.error $ printError error
        Right response -> jsonHandler response.body
) (get ResponseFormat.json "contents.json")

convertViewToModel :: Array Node -> Effect (Array JSON.Json)
convertViewToModel nodes = traverseWithIndex (\index node ->
    case fromNode node of
        Just element -> do
            domTokenList <- classList element
            isText <- DOMTokenList.contains domTokenList "text"
            isLongText <- DOMTokenList.contains domTokenList "long-text"
            isCalendar <- DOMTokenList.contains domTokenList "calendar"
            if isText then do
                _element <- querySelector (QuerySelector "input") (toParentNode element)
                case _element of
                    Just __element -> do
                        case HTMLInputElement.fromElement __element of
                            Just input -> do
                                value <- HTMLInputElement.value input
                                pure $ JSON.fromObject $ Object.singleton ("q" <> (show index)) (JSON.fromString value)
                            Nothing -> pure $ JSON.fromObject $ Object.empty
                    Nothing -> pure JSON.jsonNull
            else if isLongText then do
                _element <- querySelector (QuerySelector "textarea") (toParentNode element)
                case _element of
                    Just __element -> do
                        case HTMLTextAreaElement.fromElement __element of
                            Just textarea -> do
                                value <- HTMLTextAreaElement.value textarea
                                pure $ JSON.fromObject $ Object.singleton ("q" <> (show index)) (JSON.fromString value)
                            Nothing -> pure $ JSON.fromObject $ Object.empty
                    Nothing -> pure JSON.jsonNull
            else if isCalendar then do
                results <- getCalendarResult element
                pure $ JSON.fromObject $ Object.singleton ("q" <> (show index)) (JSON.fromArray (map (\result ->
                    case result of
                        Just calendarResult -> do
                            let startTimeString = fromRight "" (formatDateTime "YYYY-MM-DDTHH:mm:ss" calendarResult.startTime)
                            let endimeString = fromRight "" (formatDateTime "YYYY-MM-DDTHH:mm:ss" calendarResult.endTime)
                            JSON.fromObject $ Object.fromFoldable [(Tuple "startTime" (JSON.fromString startTimeString)), (Tuple "endTime" (JSON.fromString endimeString))]
                        Nothing -> JSON.jsonNull
                ) results))
            else do
                nodeList <- querySelectorAll (QuerySelector ".checkbox") (toParentNode element)
                _nodeList <- NodeList.toArray nodeList
                chekboxModel <- convertCheckboxToModel _nodeList
                pure $ JSON.fromObject $ Object.singleton ("q" <> (show index)) (JSON.fromArray (filter (\entry -> not JSON.isNull entry) chekboxModel))
        Nothing -> pure JSON.jsonNull
) nodes

convertCheckboxToModel :: Array Node -> Effect (Array JSON.Json)
convertCheckboxToModel nodes = 
    traverse (\node ->
        case fromNode node of
            Just element -> do
                domTokenList <- classList element
                selected <- DOMTokenList.contains domTokenList "selected"
                if selected then do
                    text <- textContent node
                    pure (JSON.fromString text)
                else 
                    pure JSON.jsonNull
            Nothing -> pure JSON.jsonNull
    ) nodes

type FormParameters = {
    title :: String,
    formType :: FormType,
    selection :: Maybe (Array String),
    constraints :: Maybe (Array String),
    attributes :: Maybe (HashMap.HashMap String String)
}

data FormType = Text | MultiSelect | LongText | Calendar

formTypeFromString :: String -> FormType
formTypeFromString "MultiSelect" = MultiSelect
formTypeFromString "LongText" = LongText
formTypeFromString "Calendar" = Calendar
formTypeFromString _ = Text

formParameters :: FormParameters
formParameters = { 
    title: "",
    formType: Text,
    selection: Nothing,
    constraints: Nothing,
    attributes: Nothing
}

loadForm :: FormParameters -> Effect Element
loadForm parameters = do
    form <- htmlTag elementParameters { 
        tagName = "div", 
        classes = Just ["question"],
        style = Just "margin: 32px 0px;" 
    }

    headline <- htmlTag elementParameters { 
        tagName = "h2", 
        style = Just "font-weight: 600; margin-bottom: 16px", 
        contents = Just parameters.title
    }
    appendChild (toNode headline) (toNode form)

    contents <- htmlTag elementParameters { tagName = "div" }
    appendChild (toNode contents) (toNode form)

    case parameters.formType of
        Text -> do
            classList form >>= \domTokenList -> DOMTokenList.add domTokenList "text"

            input <- htmlTag elementParameters { 
                tagName = "input",
                style = Just "width: 100%; height: 32px",
                attributes = Just (HashMap.fromArray [ Tuple "type" "text" ])
            }
            appendChild (toNode input) (toNode contents)

            case parameters.constraints of
                Just constraints -> 
                    if elem "required" constraints then
                        setAttribute "required" "required" input
                    else pure unit
                Nothing -> pure unit
        MultiSelect -> do
            domTokenList <- classList form
            DOMTokenList.add domTokenList "multi-select"

            case parameters.selection of
                Just selection -> traverse_ (\item -> do
                    input <- htmlTag elementParameters { 
                        tagName = "div", 
                        classes = Just ["checkbox"],
                        contents = Just item
                    }
                    listener <- eventListener (\event -> do
                        case Event.target event of
                            Just eventTarget -> do
                                case fromEventTarget eventTarget of
                                    Just element -> do
                                        _domTokenList <- classList element
                                        selected <- DOMTokenList.contains _domTokenList "selected"
                                        if selected then DOMTokenList.remove _domTokenList "selected" else DOMTokenList.add _domTokenList "selected"
                                    Nothing -> pure unit
                            Nothing -> pure unit
                    )
                    addEventListener click listener false (toEventTarget input)
                    appendChild (toNode input) (toNode contents)
                ) selection
                Nothing -> pure unit
        LongText -> do
            domTokenList <- classList form
            DOMTokenList.add domTokenList "long-text"

            input <- htmlTag elementParameters { 
                tagName = "textarea",
                style = Just "width: 100%; height: 80px",
                attributes = Just (HashMap.fromArray [ Tuple "type" "text" ])
            }
            appendChild (toNode input) (toNode contents)
        Calendar -> do
            domTokenList <- classList form
            DOMTokenList.add domTokenList "calendar"

            now <- nowDate
            let result = case parameters.attributes of
                    Just attributes -> do
                        let year' = case lookup "year" attributes of
                                Just yearString -> 
                                    case fromString yearString of
                                        Just yearValue -> 
                                            case toEnum yearValue of
                                                Just value -> value
                                                Nothing -> year now
                                        Nothing -> year now
                                Nothing -> year now
                        let month' = case lookup "month" attributes of
                                Just monthString -> 
                                    case fromString monthString of
                                        Just monthValue -> 
                                            case toEnum monthValue of
                                                Just value -> value
                                                Nothing -> month now
                                        Nothing -> month now
                                Nothing -> month now
                        (Tuple year' month')
                    Nothing -> do
                        (Tuple (year now) (month now))
            calendar <- createCalender (fst result) (snd result)
            appendChild (toNode calendar) (toNode contents)
    pure form