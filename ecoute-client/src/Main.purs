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
import Data.Argonaut.Core (toArray, toObject, toString)
import Data.Argonaut.Core as JSON
import Data.Array (filter)
import Data.DateTime (adjust)
import Data.Either (Either(..), fromRight)
import Data.Foldable (traverse_)
import Data.Formatter.DateTime (formatDateTime)
import Data.HashMap as HashMap
import Data.Int (round)
import Data.Maybe (Maybe(..), maybe)
import Data.String (Pattern(..), split)
import Data.Time.Duration (negateDuration)
import Data.Traversable (traverse)
import Data.TraversableWithIndex (traverseWithIndex)
import Data.Tuple (Tuple(..))
import DomUtils (elementParameters, htmlTag)
import Effect (Effect)
import Effect.Aff (runAff_)
import Effect.Class.Console as Console
import Effect.Exception as Exception
import Effect.Now (getTimezoneOffset, nowDateTime)
import Foreign.Object as Object
import Web.DOM.DOMTokenList as DOMTokenList
import Web.DOM.Document as Document
import Web.DOM.Element (Element, classList, fromEventTarget, fromNode, toEventTarget, toNode, toParentNode)
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
        case Object.lookup "title" setting of 
            Just title -> do
                element <- htmlTag elementParameters { 
                    tagName = "h1", 
                    style = Just "font-size: large; font-weight: 600; margin-bottom: 8px;", 
                    contents = Just $ maybe "" identity $ toString title
                }
                appendChild (toNode element) (toNode contents)
            Nothing -> Console.error "No title defined in the configuration file."
        case Object.lookup "notes" setting of 
            Just notes -> do
                traverse_ (\entry -> do
                    element <- htmlTag elementParameters { 
                        tagName = "p", 
                        style = Just "font-size: small; color: gray; margin-bottom: 8px;", 
                        contents = Just entry
                    }
                    appendChild (toNode element) (toNode contents)
                ) (split (Pattern "\n") $ maybe "" identity $ toString notes)
            Nothing -> pure unit
        case Object.lookup "questions" setting of 
            Just questions -> do
                traverse_ (\entry -> do
                    let object = maybe Object.empty identity $ toObject entry
                    element <- loadForm formParameters { 
                        title = getStringFromObject "question" object,
                        formType = fromString $ getStringFromObject "formType" object,
                        selection = Just $ getStringArrayFromObject "selection" object
                    }
                    appendChild (toNode element) (toNode contents)
                ) (maybe [] identity $ toArray questions)
            Nothing -> pure unit
    )

    controls <- htmlTag elementParameters { 
        tagName = "div", 
        style = Just "text-align: center;"
    }
    appendChild (toNode controls) (toNode mainContents)

    applyButton <- htmlTag elementParameters { 
        tagName = "button", 
        classes = Just ["applyButton"], 
        contents = Just "回答する" 
    }
    listener <- eventListener applyHandler
    addEventListener click listener false (toEventTarget applyButton)
    appendChild (toNode applyButton) (toNode controls)

    pure mainContents

applyHandler :: Types.Event -> Effect Unit
applyHandler _ = do
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
                Right _ -> showThanks
        ) (post ResponseFormat.string (contextPath <> "/answer") $ Just $ RequestBody.json $ requestBody)

showThanks :: Effect Unit
showThanks = do
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
                contents = Just "お忙しいところご回答いただきありがとうございました！"
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

getStringFromObject :: String -> Object.Object JSON.Json -> String
getStringFromObject key object = do
    let value = maybe JSON.jsonNull identity $ Object.lookup key object
    maybe "" identity $ toString value

getStringArrayFromObject :: String -> Object.Object JSON.Json -> Array String
getStringArrayFromObject key object = do
    let value = maybe JSON.jsonNull identity $ Object.lookup key object
    let array = maybe [] identity $ toArray value
    map (\json -> maybe "" identity $ toString json) array

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
    selection :: Maybe (Array String)
}

data FormType = Text | MultiSelect | LongText | Calendar

fromString :: String -> FormType
fromString "MultiSelect" = MultiSelect
fromString "LongText" = LongText
fromString "Calendar" = Calendar
fromString _ = Text

formParameters :: FormParameters
formParameters = { 
    title: "",
    formType: Text,
    selection: Nothing
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

            calendar <- createCalender
            appendChild (toNode calendar) (toNode contents)
    pure form