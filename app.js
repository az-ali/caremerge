const http = require('http');
const url = require('url')
const { getTitles, makeHtmlResponse } = require('./utils/functions')
const { getTitlesAsync, makeHtmlResponseAsync } = require('./utils/functions')
const { getTitlesPromises } = require('./utils/functions')


const port = process.env.PORT || 3000

//create a server object:
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // http header

    const path = url.parse(req.url, true).pathname
    const queryObj = url.parse(req.url, true).query

    if (path === '/I/want/title' || path === '/I/want/title/') {

        // if no address is given
        if (!queryObj.address) {
            res.write('Please provide some valid address')
            res.end()
            return
        }
        // get the HTML titles of given addresses
        getTitles(queryObj.address, (error, titles) => {

            if (error) {
                res.write('Something Went wrong - try again')
                res.end()
            } else {
                // to get the html 
                makeHtmlResponse(titles, (resToWrite) => {
                    console.log('recieving response on server using raw node and http')
                    res.write(resToWrite); //write a response
                    res.end(); //end the response
                })
            }
        })

    } else if (path === '/Async/I/want/title' || path === '/Async/I/want/title/') {

        // if no address is given
        if (!queryObj.address) {
            res.write('Please provide some valid address')
            res.end()
            return
        }
        // get the HTML titles of given addresses
        getTitlesAsync(queryObj.address, (error, titles) => {

            if (error) {
                res.write('Something Went wrong - try again')
                res.end()
            } else {
                // to get the html 
                makeHtmlResponseAsync(titles, (resToWrite) => {
                    console.log('recieving respopnse using Async')
                    res.write(resToWrite); //write a response
                    res.end(); //end the response
                })
            }
        })

    } else if (path === '/Promises/I/want/title' || path === '/Promises/I/want/title/') {

        // if no address is given
        if (!queryObj.address) {
            res.write('Please provide some valid address')
            res.end()
            return
        }

        // get the HTML titles of given addresses with promises way
        getTitlesPromises(queryObj.address).then((resToWrite) => {
            console.log('recieving response on server with promises...')
            console.log(resToWrite)
            res.write(resToWrite)
            res.end()
        }).catch((err) => {
            console.log(err)
            res.write('Something went wrong!')
            res.end()
        })


    } else {
        res.write('<h1>404 page<h1>'); //write a response
        res.end(); //end the response
    }

}).listen(port, function () {
    console.log("server start at port" + port); //the server object listens on port 3000
});

