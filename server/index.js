const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World~~'))

app.get('/api/hello', (req, res) => {
    res.send("Hi~")
})

app.post('/api/users/register', (req, res) => {
    //ȸ�� ���� �Ҷ� �ʿ��� �������� client���� ��������
    //�װ͵��� ������ ���̽��� �־��ش�.

    const user = new User(req.body)

    user.save((err,doc) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
 //��û�� �̸����� �����ͺ��̽����� �ִ��� ã�´�.
 User.findOne({ email: req.body.email  }, (err, user) => {
    if(!user){
        return res.json({
            loginSuccess: false,
            message: "������ �̸��Ͽ� �ش��ϴ� ������ �����ϴ�."
        })
    }

        //��û�� �̸����� �����ͺ��̽��� �ִٸ� ��й�ȣ�� �´� ��й�ȣ���� Ȯ��.

        user.comparePassword(req.body.password, (err, isMatch ) => {
            if(!isMatch)
                return res.json({loginSuccess: false, message: "��й�ȣ�� Ʋ�Ƚ��ϴ�."})

            //��й�ȣ���� �´ٸ� ��ū�� �����ϱ�.

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // ��ū�� �����Ѵ�. ���? ��Ű, ���ý��丮��
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})

            })
        })
    })
})

// role 1 ���� role 2 Ư�� �μ� ����
// role 0 -> �Ϲ� ���� role 0�� �ƴϸ� ������

app.get('/api/users/auth', auth, (req, res) => {

    // ������� �̵��� ����� �Դٴ� ���� Authentication �� True ��� ��.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id},
        { token: ""},
        (err, user) => {
            if(err) return res.json({ success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))