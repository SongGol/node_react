const express = require('express')
const app = express()
const port = 5000

const { User } = require('./models/User'); 
const { auth } = require('./middleware/auth');
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요")
})

app.post('/api/users/register', (req, res) => {
    //회원가입시 필요한 정보를 client에서 가져와서 db에 넣어줌

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            success: true,
        });
    });
});

app.post('/api/users/login', (req, res) => {
    //요청된 이메일이 db에 있는지 확인
    User.findOne({
        email: req.body.email,
    }, (err, userInfo) => {
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                });
            }
            userInfo.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //토큰을 어디에 저장? 쿠키? 로컬저장소?
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,
                    });
            });
        });
    });
    //이메일이 있으면 비밀번호가 같은지 확인

    //비밀번호가 같다면 토큰 생성
});

app.get('/api/users/auth', auth, (req, res) => {
    //미들웨러를 통과했다는 것은 auth가 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user.id},
        { token: "" },
        (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true,
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});