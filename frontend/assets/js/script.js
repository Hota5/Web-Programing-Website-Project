var app = $.spapp({
    defaultView: "#home",
    templateDir: "./views/"
});

app.route({
    view: "home",
    onReady: renderProducts
});

app.route({
    view: "about",
    onReady: function() {}  
});

app.route({
    view: "contact",
    onReady: ContactForm  
});

app.route({
    view: "login",
    onReady: LoginPage  
});

app.route({
    view: "profile",
    onReady: ProfilePage  
});

app.route({
    view: "checkout",
    onReady: CheckoutPage  
});

app.route({
    view: "admin",
    onReady: AdminPage  
});

app.route({
    view: "product-detail",
    onReady: ProductDetail  
});


app.run();



