const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Dữ liệu người dùng trong bộ nhớ (dùng cho mục đích minh họa)
const users = {};

// Các route
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login', { message: '' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (users[email] && users[email].password === password) {
        res.render('home', { username: users[email].username });
    } else {
        res.render('login', { message: 'Email hoặc mật khẩu không đúng' });
    }
});

app.get('/signup', (req, res) => {
    res.render('signup', { message: '' });
});

app.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (users[email]) {
        res.render('signup', { message: 'Email đã được đăng ký' });
        return;
    }

    if (password !== confirmPassword) {
        res.render('signup', { message: 'Mật khẩu không khớp' });
        return;
    }

    if (password.length < 6) {
        res.render('signup', { message: 'Mật khẩu phải có ít nhất 6 ký tự' });
        return;
    }

    users[email] = { username, password };
    res.render('login', { message: 'Đăng ký thành công! Vui lòng đăng nhập.' });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
