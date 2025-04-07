{-
Copyright 2025 Takuro Okada.
Released under the MIT License.
-}

module Calendar
  ( createCalender
  , getCalendarResult
  )
  where

import Prelude

import Data.Array (head, last, length, (..))
import Data.Date (Date, Day, Month(..), Weekday(..), Year, adjust, canonicalDate, day, exactDate, month, weekday, year)
import Data.DateTime as DateTime
import Data.Either (fromRight)
import Data.Enum (fromEnum, toEnum)
import Data.Foldable (for_)
import Data.Formatter.Number (formatNumber)
import Data.HashMap (insert)
import Data.Int (fromString)
import Data.Int as Int
import Data.Maybe (Maybe(..), maybe)
import Data.Number (abs)
import Data.Number as Number
import Data.String (Pattern(..), split, stripSuffix)
import Data.Time (Time(..))
import Data.Time.Duration (Days(..))
import Data.Traversable (traverse)
import DomUtils (elementParameters, getNumberValueFromStyles, getStyles, htmlTag, setStyles)
import Effect (Effect)
import Effect.Now (getTimezoneOffset, nowDate)
import Web.DOM (Element, Node)
import Web.DOM.ChildNode (remove)
import Web.DOM.DOMTokenList as DOMTokenList
import Web.DOM.Document as Document
import Web.DOM.Element (classList, fromNode, getAttribute, setAttribute, toChildNode, toEventTarget, toNode, toParentNode)
import Web.DOM.Node (appendChild, textContent)
import Web.DOM.NodeList (toArray)
import Web.DOM.ParentNode (QuerySelector(..), querySelector, querySelectorAll)
import Web.Event.Event (preventDefault, stopPropagation)
import Web.Event.EventTarget (addEventListener, eventListener)
import Web.HTML (window)
import Web.HTML.Event.EventTypes (click)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLElement (fromElement, offsetHeight, offsetLeft, offsetTop, offsetWidth)
import Web.HTML.Window (document)
import Web.UIEvent.MouseEvent (buttons, fromEvent, pageY)
import Web.UIEvent.MouseEvent.EventTypes (mousemove)

createCalender :: Effect Element
createCalender = do
    container <- htmlTag elementParameters { 
        tagName = "div",
        style = Just "display: inline-block;",
        classes = Just ["calendar"]
    }
    let containerNode = toNode container

    now <- nowDate

    headerRow <- htmlTag elementParameters { 
        tagName = "div",
        style = Just "display: block; text-align: center;"
    }
    let headerRowNode = toNode headerRow
    appendChild headerRowNode containerNode

    htmlTag elementParameters { 
        tagName = "div",
        style = Just "display: inline-block; margin: 0 4px 0 0; font-weight: 600; user-select: none;",
        classes = Just ["year"],
        contents = Just (show (fromEnum (year now)))
    } >>= toNode >>> \node -> appendChild node headerRowNode

    htmlTag elementParameters { 
        tagName = "div",
        style = Just "display: inline-block; margin: 0 0 0 4px; font-weight: 600; user-select: none;",
        classes = Just ["month"],
        contents = Just (show (month now))
    } >>= toNode >>> \node -> appendChild node headerRowNode

    weekdayRow <- htmlTag elementParameters { 
        tagName = "div",
        style = Just "display: block;"
    }
    let weekdayRowNode = toNode weekdayRow
    appendChild weekdayRowNode containerNode

    for_ (0..6) (\i -> do
        let label = case i of
                0 -> "Sun"
                1 -> "Mon"
                2 -> "Tue"
                3 -> "Wed"
                4 -> "Thu"
                5 -> "Fri"
                _ -> "Sat"
        htmlTag elementParameters { 
            tagName = "div",
            style = Just ("display: inline-block; width: 72px; padding: 4px; border-bottom: 1px solid black; user-select: none;"),
            contents = Just label
        } >>= toNode >>> \node -> appendChild node weekdayRowNode
    )

    case (firstDate now) of
        Just date -> do
            row <- createRow
            let rowNode = toNode row
            appendChild rowNode containerNode

            let weekdayOffset = case weekday date of
                    Sunday -> 0
                    Monday -> 1
                    Tuesday -> 2
                    Wednesday -> 3
                    Thursday -> 4
                    Friday -> 5
                    Saturday -> 6
            createOffsetElement weekdayOffset rowNode

            createCalenderElement date rowNode containerNode
            
            pure container
        Nothing -> pure container

createOffsetElement :: Int -> Node -> Effect Unit
createOffsetElement offset rowNode
    | offset == 0 = pure unit
    | otherwise = do
        htmlTag elementParameters { 
            tagName = "div",
            style = Just ("display: inline-block; width: 72px; height: 72px; vertical-align: top;")
        } >>= toNode >>> \node -> appendChild node rowNode

        if offset-1 > 0 then 
            createOffsetElement (offset-1) rowNode
        else pure unit

createCalenderElement :: Date -> Node -> Node -> Effect Unit
createCalenderElement date rowNode containerNode = do
    let width = 72
    let height = 72

    element <- htmlTag elementParameters { 
        tagName = "div",
        style = Just ("display: inline-block; width: " <> show width <> "px; height: " <> show height <> "px; vertical-align: top; user-select: none; position: relative;"),
        classes = Just ["day"]
    }
    appendChild (toNode element) rowNode

    rangeElement <- htmlTag elementParameters { 
        tagName = "div",
        style = Just ("display: none; width: 100%; height: 100%; position: absolute; left: 0; top: 0; background: repeating-linear-gradient(-45deg, white, white 3px, #e0e0e0 0px, #e0e0e0 6px);"),
        classes = Just ["range"]
    }
    appendChild (toNode rangeElement) (toNode element)

    dayLabel <- htmlTag elementParameters { 
        tagName = "div",
        style = Just ("display: inline-block; width: 100%; height: 100%; padding: 4px; position: absolute; left: 0; top: 0;"),
        classes = Just ["label"],
        contents = Just $ show $ fromEnum $ day date
    }
    appendChild (toNode dayLabel) (toNode element)

    timeButton <- addTimeButton element (\startTime endTime -> do
        let scaleHeight = (Int.toNumber height) / 24.0
        let rangeY = scaleHeight * (Int.toNumber startTime)
        let rangeHeight = scaleHeight * (Int.toNumber (endTime - startTime))
        getStyles rangeElement >>= \styles -> setStyles ((insert "top" ((show rangeY) <> "px") >>> insert "height" ((show rangeHeight) <> "px")) styles) rangeElement
    )

    eventListener (\_ -> 
        classList element >>= \domTokenList -> 
            DOMTokenList.contains domTokenList "selected" >>= \selected -> 
                if selected then do
                    DOMTokenList.remove domTokenList "selected"
                    getStyles rangeElement >>= \styles -> setStyles (insert "display" "none" styles) rangeElement
                    getStyles timeButton >>= \styles -> setStyles (insert "display" "none" styles) timeButton
                else do
                    DOMTokenList.add domTokenList "selected"
                    getStyles rangeElement >>= \styles -> setStyles (insert "display" "inline-block" styles) rangeElement
                    getStyles timeButton >>= \styles -> setStyles (insert "display" "inline-block" styles) timeButton
    ) >>= \handler -> addEventListener click handler false (toEventTarget element)

    case adjust (Days 1.0) date of
        Just nextDate -> 
            if month nextDate == month date then 
                if weekday nextDate == Sunday then do
                    newRow <- createRow
                    let newRowNode = toNode newRow
                    appendChild newRowNode containerNode
                    createCalenderElement nextDate newRowNode containerNode
                else 
                    createCalenderElement nextDate rowNode containerNode
            else pure unit
        Nothing -> pure unit

createRow :: Effect Element
createRow = htmlTag elementParameters { 
    tagName = "div",
    style = Just "display: block; white-space: nowrap; border-bottom: 1px solid black;"
}

firstDate :: Date -> Maybe Date
firstDate date = case toEnum 1 of
    Just day -> exactDate (year date) (month date) day
    Nothing -> Nothing

addTimeButton :: Element -> (Int -> Int -> Effect Unit) -> Effect Element
addTimeButton parentElement applyHandler = do
    element <- htmlTag elementParameters { 
        tagName = "div",
        style = Just ("display: none; width: 40px; height: 40px; position: absolute; right: 16px; top: 16px; opacity: 0.3;"),
        classes = Just ["timeButton"]
    }
    appendChild (toNode element) (toNode parentElement)

    eventListener (\event -> do
        stopPropagation event

        let parseTime timeString = do
                let times = split (Pattern "-") timeString
                if length times == 2 then do
                    let startString = maybe "00" identity (stripSuffix (Pattern ":00") (maybe "00:00" identity (head times)))
                    let endString = maybe "00" identity (stripSuffix (Pattern ":00") (maybe "00:00" identity (last times)))
                    {startTime : maybe 0 identity (Int.fromString startString), endTime : maybe 0 identity (Int.fromString endString)}
                else 
                    {startTime : 0, endTime : 24}
        
        title <- getAttribute "title" element
        let timeString = maybe "" identity title
        let time = parseTime timeString
        addTimeElement parentElement time.startTime time.endTime (\startTime endTime -> do
            if startTime > 0 || endTime < 24 then do
                let formatTime st et =
                        (fromRight "" (formatNumber "00" (Int.toNumber st))) <>
                        ":00-" <>
                        (fromRight "" (formatNumber "00" (Int.toNumber et))) <>
                        ":00"
                styles <- getStyles element
                let styles' = insert "opacity" "1.0" styles
                setStyles styles' element
                setAttribute "title" (formatTime startTime endTime) element
                pure unit
            else do
                styles <- getStyles element
                let styles' = insert "opacity" "0.3" styles
                setStyles styles' element
                setAttribute "title" "" element
                pure unit
            applyHandler startTime endTime
        )
    ) >>= \handler -> addEventListener click handler false (toEventTarget element)

    pure element

addTimeElement :: Element -> Int -> Int -> (Int -> Int -> Effect Unit) -> Effect Unit
addTimeElement relativeElement startTime endTime closeHandler = do
    result <- window >>= document >>= toDocument >>> Document.toParentNode >>> querySelector (QuerySelector "body")
    case result of
        Just bodyElement ->
            case fromElement relativeElement of
                Just htmlElement -> do
                    x <- offsetLeft htmlElement
                    y <- offsetTop htmlElement
                    width <- offsetWidth htmlElement
                    height <- offsetHeight htmlElement
                    let scaleHeight = 16.0
                    let containerHeight = scaleHeight*24.0

                    maskElement <- htmlTag elementParameters { 
                        tagName = "div",
                        style = Just ("position: absolute; left: 0; top: 0; width: 100%; height: 100%;"),
                        classes = Just ["mask"]
                    }
                    appendChild (toNode maskElement) (toNode bodyElement)

                    element <- htmlTag elementParameters { 
                        tagName = "div",
                        style = Just ("display: inline-block; width: 72px; height: " <> show (containerHeight) <> "px; position: absolute; " <> 
                            "left: " <> show (x+width+8.0) <> "px; top: " <> show (y+height/2.0-containerHeight/2.0)  <> "px; " <>
                            "background-color: white; border-radius: 4px; border: 1px solid gray; box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.8);"),
                        classes = Just ["time"]
                    }
                    appendChild (toNode element) (toNode maskElement)

                    let initialY = scaleHeight * (Int.toNumber startTime)
                    let initialHeight = scaleHeight * (Int.toNumber (endTime - startTime))

                    rangeElement <- htmlTag elementParameters { 
                        tagName = "div",
                        style = Just ("display: inline-block; width: 100%; height: " <> show initialHeight <> "px; position: absolute; left: 0; top: " <> show initialY <> "px; background: repeating-linear-gradient(-45deg, white, white 3px, #e0e0e0 0px, #e0e0e0 6px);"),
                        classes = Just ["range"]
                    }
                    appendChild (toNode rangeElement) (toNode element)

                    scaleContainer <- htmlTag elementParameters { 
                        tagName = "div",
                        style = Just ("display: block; width: 100%; height: 100%; position: relative;"),
                        classes = Just ["scale"]
                    }
                    appendChild (toNode scaleContainer) (toNode element)

                    for_ (0..23) (\i -> do
                        scaleElement <- htmlTag elementParameters { 
                            tagName = "div",
                            style = Just ("display: block; width: 100%; height: " <> show scaleHeight <> "px; font-size: 8pt; border-bottom: 1px solid black; vertical-align: top; padding: 0 4px; user-select: none;"),
                            classes = Just ["scale"],
                            contents = Just ((fromRight "" (formatNumber "00" (Int.toNumber i))) <> ":00")
                        }
                        appendChild (toNode scaleElement) (toNode scaleContainer)
                    )

                    eventListener (\event -> do
                        stopPropagation event

                        rangeElementStyles <- getStyles rangeElement
                        let rangeElementY = getNumberValueFromStyles "top" rangeElementStyles
                        let rangeElementHeight = getNumberValueFromStyles "height" rangeElementStyles
                        let startTime' = Int.round (rangeElementY/scaleHeight)
                        let endTime' = Int.round ((rangeElementHeight+rangeElementY)/scaleHeight)
                        closeHandler startTime' endTime'

                        remove (toChildNode maskElement)
                    ) >>= \handler -> addEventListener click handler false (toEventTarget maskElement)

                    eventListener (\event -> do
                        preventDefault event
                        stopPropagation event
                    ) >>= \handler -> addEventListener click handler false (toEventTarget element)

                    eventListener (\event -> do
                        case fromEvent event of
                            Just mouseEvent -> do
                                if buttons mouseEvent == 0 then
                                    pure unit
                                else do
                                    rangeElementStyles <- getStyles rangeElement
                                    elementY <- maybe (pure 0.0) (\elm -> offsetTop elm) (fromElement element)
                                    let rangeElementY = getNumberValueFromStyles "top" rangeElementStyles
                                    let rangeElementHeight = getNumberValueFromStyles "height" rangeElementStyles
                                    let currentY = (Int.toNumber (pageY mouseEvent)) - elementY - 32.0
                                    let rangeElementPosition = (Number.round (currentY / scaleHeight)) * scaleHeight
                                    let distanceTop = abs (currentY - rangeElementY)
                                    let distanceBottom = abs (currentY - (rangeElementY+rangeElementHeight))
                                    if distanceTop < distanceBottom then do
                                        let styles = (insert "top" (show rangeElementPosition <> "px") >>> insert "height" (show ((rangeElementY+rangeElementHeight)-rangeElementPosition) <> "px")) rangeElementStyles
                                        setStyles styles rangeElement
                                    else if distanceTop > distanceBottom  then do
                                        let styles = insert "height" (show (containerHeight-rangeElementY-(containerHeight-rangeElementPosition)) <> "px") rangeElementStyles
                                        setStyles styles rangeElement
                                    else
                                        pure unit
                            Nothing -> pure unit
                    ) >>= \handler -> addEventListener mousemove handler false (toEventTarget element)
                Nothing -> pure unit
        Nothing -> pure unit

type CalendarResult = {startTime :: DateTime.DateTime, endTime :: DateTime.DateTime}

getCalendarResult :: Element -> Effect (Array (Maybe CalendarResult))
getCalendarResult element = do
    year <- getYear element
    month <- getMonth element
    dayList <- querySelectorAll (QuerySelector ".day.selected") (toParentNode element)
    days <- toArray dayList
    arr <- traverse (\node ->
        case fromNode node of
            Just dayElement -> do
                timeResult <- getTimeResult dayElement
                day <- getDay dayElement
                let date = createDate year month day
                case date of
                    Just date' -> do
                        case timeResult of
                            Just timeResult' ->
                                    createDateTime date' timeResult'.startTime >>= \startDateTime -> createDateTime date' timeResult'.endTime >>= \endDateTime -> pure (Just {startTime: startDateTime, endTime: endDateTime})
                            Nothing -> 
                                case getTime 0 0 0 0 of
                                    Just time' -> createDateTime date' time' >>= \startDateTime -> createDateTime date' time' >>= \endDateTime -> pure (Just {startTime: startDateTime, endTime: endDateTime})
                                    Nothing ->  pure Nothing
                    Nothing -> pure Nothing
            Nothing -> pure Nothing
        ) days
    pure arr

createDateTime :: Date -> Time -> Effect DateTime.DateTime
createDateTime date time = do
    let dateTime = DateTime.DateTime date time
    getTimezoneOffset >>= \timezoneOffset -> pure (maybe dateTime identity (DateTime.adjust timezoneOffset dateTime))

createDate :: Maybe Year -> Maybe Month -> Maybe Day -> Maybe Date
createDate year month day = do
    case year of
        Just year' -> case month of
            Just month' -> case day of
                Just day' -> Just (canonicalDate year' month' day')
                Nothing -> Nothing
            Nothing -> Nothing
        Nothing -> Nothing

getYear :: Element -> Effect (Maybe Year)
getYear calendarElement = do
    element <- querySelector (QuerySelector ".year") (toParentNode calendarElement)
    case element of
        Just label -> do
            dateValue <- textContent (toNode label)
            case fromString dateValue of
                Just value -> pure (toEnum value)
                Nothing -> pure Nothing
        Nothing -> pure Nothing

getMonth :: Element -> Effect (Maybe Month)
getMonth calendarElement = do
    element <- querySelector (QuerySelector ".month") (toParentNode calendarElement)
    case element of
        Just label -> do
            value <- textContent (toNode label)
            pure (monthFromString value)
        Nothing -> pure Nothing

getDay :: Element -> Effect (Maybe Day)
getDay dayElement = do
    element <- querySelector (QuerySelector ".label") (toParentNode dayElement)
    case element of
        Just label -> do
            dateValue <- textContent (toNode label)
            case fromString dateValue of
                Just value -> pure (toEnum value)
                Nothing -> pure Nothing
        Nothing -> pure Nothing

type TimeResult = {startTime :: Time, endTime :: Time}

getTimeResult :: Element -> Effect (Maybe TimeResult)
getTimeResult dayElement = do
    element <- querySelector (QuerySelector ".timeButton") (toParentNode dayElement)
    case element of
        Just timeButton -> do
            attribute <- getAttribute "title" timeButton
            case attribute of
                Just title -> do
                    let times = split (Pattern "-") title
                    if length times == 2 then do
                        let startString = maybe "00:00" identity (head times)
                        let endString = maybe "00:00" identity (last times)
                        let startString' = maybe "00" identity (stripSuffix (Pattern ":00") startString)
                        let endString' = maybe "00" identity (stripSuffix (Pattern ":00") endString)
                        let startValue = maybe 0 identity (fromString startString')
                        let endValue = maybe 0 identity (fromString endString')
                        case getTime startValue 0 0 0 of
                            Just startTime -> case getTime endValue 0 0 0 of
                                Just endTime -> pure (Just {startTime: startTime, endTime: endTime})
                                Nothing -> pure Nothing
                            Nothing -> pure Nothing
                    else pure Nothing
                Nothing -> pure Nothing
        Nothing -> pure Nothing

getTime :: Int -> Int -> Int -> Int -> Maybe Time
getTime hour minute second millisecond = 
    case toEnum hour of
        Just hourValue -> case toEnum minute of
            Just minuteValue -> case toEnum second of
                Just secondValue -> case toEnum millisecond of
                    Just millisecondValue -> Just (Time hourValue minuteValue secondValue millisecondValue)
                    Nothing -> Nothing
                Nothing -> Nothing
            Nothing -> Nothing
        Nothing -> Nothing

monthFromString :: String -> Maybe Month
monthFromString string = 
    case string of
        "January" -> Just January
        "February" -> Just February
        "March" -> Just March
        "April" -> Just April
        "May" -> Just May
        "June" -> Just June
        "July" -> Just July
        "August" -> Just August
        "September" -> Just September
        "October" -> Just October
        "November" -> Just November
        "December" -> Just December
        _ -> Nothing