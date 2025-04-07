{-
Copyright 2025 Takuro Okada.
Released under the MIT License.
-}

module DomUtils
  ( ElementParameters
  , Link(..)
  , absoluteTop
  , elementParameters
  , getStyles
  , setStyles
  , getNumberValueFromStyles
  , htmlTag
  )
  where

import Prelude

import Data.Foldable (traverse_)
import Data.HashMap (HashMap, empty, fromArray, lookup, toArrayBy)
import Data.Maybe (Maybe(..), maybe)
import Data.Number (fromString)
import Data.String (Pattern(..), indexOf, joinWith, split, splitAt, stripSuffix, trim)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Web.DOM (Element)
import Web.DOM.DOMTokenList as DOMTokenList
import Web.DOM.Document (createElement)
import Web.DOM.Element (classList, getAttribute, setAttribute, toNode)
import Web.DOM.Node (parentElement, setTextContent)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLElement (fromElement, offsetTop)
import Web.HTML.Window (document)

data Link = Link {
    rel :: String, 
    href :: String
}

type ElementParameters = {
    tagName :: String,
    classes :: Maybe (Array String),
    attributes :: Maybe (HashMap String String),
    style :: Maybe String,
    contents :: Maybe String
}

elementParameters :: ElementParameters
elementParameters = { 
    tagName: "div", 
    classes: Nothing, 
    attributes: Nothing,
    style: Nothing, 
    contents: Nothing 
}

htmlTag :: ElementParameters -> Effect Element
htmlTag parameters = do
    element <- window >>= document >>= toDocument >>> createElement parameters.tagName
    case parameters.attributes of
        Just attributes -> traverse_ (\(Tuple k v) -> setAttribute k v element) (toArrayBy Tuple attributes)
        Nothing -> pure unit
    case parameters.classes of
        Just classes -> traverse_ (\entry -> classList element >>= \domTokenList -> DOMTokenList.add domTokenList entry) classes
        Nothing -> pure unit
    case parameters.style of
        Just style -> setAttribute "style" style element
        Nothing -> pure unit
    case parameters.contents of
        Just contents -> setTextContent contents $ toNode element
        Nothing -> pure unit
    pure element

getStyles :: Element -> Effect (HashMap String String)
getStyles element = getAttribute "style" element >>= \result -> case result of
    Just styleString -> pure $ fromArray $ map (\entry -> case indexOf (Pattern ":") entry of
        Just index -> 
            Tuple (trim (splitAt index entry).before) (splitAt (index+1) entry).after 
        Nothing -> Tuple entry ""
    ) (split (Pattern ";") styleString)
    Nothing -> pure empty

setStyles :: HashMap String String -> Element -> Effect Unit
setStyles styles element = setAttribute "style" (joinWith ";" (toArrayBy (\k v -> k <> ":" <> v) styles)) element

getNumberValueFromStyles :: String -> HashMap String String -> Number
getNumberValueFromStyles key styles = do
    let value1 = maybe "0" identity (lookup key styles)
    let value2 = maybe "0" identity (stripSuffix (Pattern "px") value1)
    maybe 0.0 identity (fromString value2)

absoluteTop :: Element -> Effect Number
absoluteTop element = do
    case fromElement element of
        Just htmlElement -> do
            y <- offsetTop htmlElement
            parent <- parentElement (toNode element)
            case parent of
                Just _parent -> absoluteTop _parent >>= \parentY -> pure (y + parentY)
                Nothing -> pure y
        Nothing -> pure 0.0
