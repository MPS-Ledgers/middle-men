const ConvertAPI = require('convertapi');
const express = require('express');
const cors = require('cors');
const app = express();
const { JSDOM } = require('jsdom');
const fs = require('fs')
const path = require('path')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// INSURANCE MAIL , CUSTOMER MAIL, HOSPITAL MAIL, MONEY
app.get('/', (req, res) => {
    let amount = 10000
    let usermail = 'bob@middlemen.com'
    let hospmail = 'appolo@middlemen.com'
    let insmail='starhealth@middlemen.com'
    let dom = new JSDOM(`<html>
    <head>
        <style>
            *{
                padding: 0;
                margin: 0;
                font-family: serif;
                overflow-x: hidden;
                overflow-y: hidden;
            }
            #topper{
                width:100%;
                min-height:100px;
                background-color: black;
            }
            .cent{
                justify-content: center;
                color:white;
                align-items: center;
                text-align: center;
                font-size:xx-large
            }
            .hd{
                padding-top: 13px;
            }
            #hlo{
                margin-top: 40px;
                margin-left: 20px;
                font-size: x-large;
            }
            .invo{
                margin-left: 40px;
                margin-top: 30px;
                font-size: larger;
            }
            .hospital{
                margin-top: 80px;
                margin-left: 20px;
                font-size: x-large;
            }
            .amount{
                margin-top: 12px;
                margin-left: 20px;
                font-size: x-large;   
            }
            .invoice{
                align-items: center;
                text-align: center;
                font-size: x-large;
            }
            .rights{
                margin-top: 80px;
                align-items: center;
                text-align: center;
                font-size:medium;
            }
            .link{
                margin-left: 20px;
                font-size: larger;
                text-decoration: none;
                color:mediumblue
            }
            .di{
                margin-top: 30px;
            }
            .contact{
                margin-top: 70px;
                margin-left: 30px;
            }
            .pe{
                margin-left: 30px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div id="topper">
            <div class="cent">
                <h1 class="hd">Middlemen</h1>
            </div>
        </div>
        <div class="invoice">
            <h1>Payment Invoice</h1>
        </div>
        <div>
            <h1 id="hlo">
                Hello ${usermail},
            </h1>
            <p class="invo">
                Here is your payment invoice
            </p>
            <h3 class="hospital">
                Hospital Mail: ${hospmail}
            </h3>
            <h3 class="amount">
                Insurance Mail: ${insmail}
            </h3>
            <h3 class="amount">
                Amount trasnfered: ${amount}
            </h3>
            <div class="di">
                <a class="link" href="https://middle-men-rapid.vercel.app/">Visit our page for any issues</a>
            </div>
            <div class="contact">
                Contact Us
            </div>
            <div class="pe">
                Phone: 180 112 345
            </div>
            <div class="pe">
                Email: mpsledgers@middlemen.com
            </div>
            <div class="rights">
                <p>© 2021 Company Co. All rights reserved.</p>
            </div>
        </div>
    </body>
</html>`)

    let data = dom.serialize();

    fs.writeFileSync("a.html", data);
    const convertapi = new ConvertAPI('1UFljI7UlXb2DfPh', { conversionTimeout: 60 });
    const filePath = path.resolve(__dirname, "a.html");
    let link = ''
    convertapi.convert('pdf', { File: filePath })
        .then(function (result) {
            console.log("Converted file url: " + result.file.url);
            link = result.file.url
            res.send(link);
        })
        .catch(function (e) {
            console.error(e.toString());
        });
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})