{-
Copyright 2025 Takuro Okada.
Released under the MIT License.
-}

module DomUtils where

import Prelude

import Data.Foldable (traverse_)
import Data.HashMap (HashMap, toArrayBy)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Web.DOM (Element)
import Web.DOM.DOMTokenList as DOMTokenList
import Web.DOM.Document (createElement)
import Web.DOM.Element (classList, setAttribute, toNode)
import Web.DOM.Node (setTextContent)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
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