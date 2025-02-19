{-
Copyright 2025 Takuro Okada.
Released under the MIT License.
-}

{-# LANGUAGE OverloadedStrings #-}

module Main where

import Control.Concurrent.MVar (MVar, newMVar, takeMVar, putMVar)
import qualified Data.Aeson as Json
import Data.ByteString.Char8 (unpack)
import qualified Data.ByteString.Lazy as BSL
import qualified Data.Vector as Vector
import Data.Time (getCurrentTime, getCurrentTimeZone, utcToLocalTime)
import Data.Time.Format (formatTime, defaultTimeLocale)
import Network.Wai.Handler.Warp (run)
import Network.HTTP.Types (methodPost, methodOptions, status200, status400, status500)
import Network.Wai (Application, requestMethod, responseLBS, rawPathInfo, strictRequestBody, Response)
import System.Directory (doesFileExist)
import System.IO (hFlush, stdout)

port :: Int
port = 3000

storageFile :: String
storageFile = "answers.json"

main :: IO ()
main = do
    writeLog $ "Starting web server on " ++ show port
    lock <- newMVar 0
    run port $ webApp lock

webApp :: MVar Int -> Application
webApp lock request respond = do
    let method = requestMethod request 
    let path = rawPathInfo request
    writeLog $ "Incoming request: " ++ unpack method ++ " " ++ unpack path
    case path of
        "/answer" -> do
            if requestMethod request == methodPost then do
                requestBody <- strictRequestBody request
                case Json.decode requestBody of
                    Just json -> do
                        insertAnswer lock json
                        respond ok
                    Nothing -> respond inernalError
            else if requestMethod request == methodOptions then respond ok
            else respond notFoundError
        _ -> do
            respond notFoundError

writeLog :: String -> IO ()
writeLog message = do
    now <- getCurrentTime
    tz <- getCurrentTimeZone
    let date = formatTime defaultTimeLocale "%Y/%m/%d %H:%M:%S" $ utcToLocalTime tz now
    putStrLn $ date ++ " " ++ message
    hFlush stdout

ok :: Response
ok = responseLBS status200 [
    ("Content-Type", "text/plain"), 
    ("Access-Control-Allow-Origin", "*"), 
    ("Access-Control-Allow-Headers", "*"), 
    ("Access-Control-Allow-Methods", "PUT")
    ] "OK"

inernalError :: Response
inernalError = responseLBS status500 [
    ("Content-Type", "text/plain"), 
    ("Access-Control-Allow-Origin", "*")
    ] "Internal Error"

notFoundError :: Response
notFoundError = responseLBS status400 [
    ("Content-Type", "text/plain"), 
    ("Access-Control-Allow-Origin", "*")
    ] "Not Found"

insertAnswer :: MVar Int -> Json.Value -> IO ()
insertAnswer lock json = do
    _ <- takeMVar lock
    exists <- doesFileExist storageFile
    if exists then do
        storedString <- BSL.readFile storageFile
        case Json.decode storedString of
            Just storedJson -> BSL.writeFile storageFile $ Json.encode $ Vector.snoc storedJson json
            Nothing -> return ()
    else do
        BSL.writeFile storageFile $ Json.encode $ Vector.singleton json
    putMVar lock 0