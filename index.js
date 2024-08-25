const express = require("express")
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())

const myData = {
    user_id: "Kandru_Mahalakshmi_20032003",
    is_success: true,
    email: "kandrumahalakshmi44@gmail.com",
    roll_number: "21BCE9653"
};


const findHighestLowercaseAlphabet = (alphabets) => {
    const lowercaseAlphabets = alphabets
        .filter(char => char >= 'a' && char <= 'z');

    if (lowercaseAlphabets.length === 0)
        return null;

    return lowercaseAlphabets.reduce((highest, current) => current > highest ? current : highest);
};

const processData = (data) => {
    const numbers = data.filter(item => !isNaN(item)).sort((a, b) => Number(a) - Number(b));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

    return {
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: findHighestLowercaseAlphabet(alphabets) ? [findHighestLowercaseAlphabet(alphabets)] : []
    };
};

app.post("/", (req, res) => {
    const { data } = req.body;


    const data1 = JSON.parse(data)['data'];

    if (!data) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const partial_result = processData(data1)

    const result = { ...partial_result, ...myData }

    res.send(result)
})

app.get("/bfhl", (req, res) => {
    res.status(200).json(
        {
            "operation_code": 1
        }
    )
})

app.post("/bfhl", (req, res) => {
    res.send(
        {
            "user_id": "Kandru_Mahalakshmi_20032003",
            "is_success": true
        }
    )
})

app.listen(3000, () => {
    console.log("App is running");
})
