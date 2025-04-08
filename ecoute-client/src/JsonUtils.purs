{-
Copyright 2025 Takuro Okada.
Released under the MIT License.
-}

module JsonUtils where

import Prelude

import Data.Argonaut.Core (Json, jsonEmptyArray, jsonEmptyObject, jsonEmptyString, jsonNull, toArray, toNumber, toObject, toString)
import Data.HashMap (HashMap, fromArray)
import Data.Maybe (maybe)
import Data.Tuple (Tuple(..))
import Foreign.Object (Object, empty, keys, lookup)

getNumberFromObject :: String -> Number -> Object Json -> Number
getNumberFromObject key defaultValue object = do
    let json = maybe jsonEmptyString identity (lookup key object)
    maybe defaultValue identity (toNumber json)

getStringFromObject :: String -> String -> Object Json -> String
getStringFromObject key defaultValue object = do
    let json = maybe jsonEmptyString identity (lookup key object)
    maybe defaultValue identity (toString json)

getArrayFromObject :: String -> Object Json -> Array Json
getArrayFromObject key object = do
    let json = maybe jsonEmptyArray identity (lookup key object)
    maybe [] identity (toArray json)

getStringArrayFromObject :: String -> Object Json -> Array String
getStringArrayFromObject key object = do
    let json = maybe jsonEmptyArray identity (lookup key object)
    let array = maybe [] identity (toArray json)
    map (\entry -> maybe "" identity (toString entry)) array

getObjectFromObject :: String -> Object Json -> Object Json
getObjectFromObject key object = do
    let json = maybe jsonEmptyObject identity (lookup key object)
    maybe empty identity (toObject json)

getStringHashMapFromObject :: String -> Object Json -> HashMap String String
getStringHashMapFromObject key object = do
    let json = maybe jsonEmptyObject identity (lookup key object)
    let object_ = maybe empty identity (toObject json)
    fromArray (map (\key_ -> do
        let json_ = maybe jsonNull identity (lookup key_ object_)
        Tuple key_ (maybe "" identity (toString json_))
    ) (keys object_))
