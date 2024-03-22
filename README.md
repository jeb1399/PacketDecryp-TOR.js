# PacketDecryp-TOR.js

This is a simple project that I thought of when I starved myself 😃


This project takes the encrypted data packets from my server and DEcrypts them in a way that tricks your router into thinking that your still on the website that decrypts the packet so say you wanted to go to youtube my server is currently hosted locally (I will publish the files here soon) will FIRST encrypt the packet THREE times once with AES encryption the second time with Base64 and the third time with Base32 then it will send you to the SECOND server that is hosted AROUND THE WORLD and decrypts the packet

## How it works
`
Youtube.com --> PacketEncryp-TOR.js --> Example.org/?decrypt=[encrypted packet] (<-- the real domain is ```[Reaplace_this_with_the_real_domain]```) --> Gets required files to load the website properly even if it has javascript that is linked like this ./example.js --> Then the server returns the decrypted information back to YOU!
`

[![Deploy to Cyclic](https://deploy.cyclic.app/button.svg)](https://deploy.cyclic.app/)
- Sets up instant continuous deployment on `git push`
- Realtime backend logs and API request monitoring
