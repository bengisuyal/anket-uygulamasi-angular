# Çevre Kirliliği Anket Uygulaması

Angular ile geliştirilmiş, kullanıcıların çevre kirliliğine yönelik anket sorularını cevaplayabildiği ve yöneticilerin cevapları görüntüleyip soru ekleyebildiği bir web uygulamasıdır.

# Özellikler
Kullanıcılar rumuz ile ankete katılabilir.

Klasik ve çoktan seçmeli soru tipleri desteklenir.

Şifre korumalı yönetici paneli.

Yönetici soru ekleyebilir, düzenleyebilir ve silebilir.

Kullanıcı cevapları ve ankete ne zaman katıldıkları yönetici panelinden görüntülenebilir.

Tüm veriler tarayıcının localStorage'ında saklanır.

# Kullanılan Teknolojiler

Angular

TypeScript

Bootstrap

localStorage

# Kurulum 

npm install

npm start

# Proje Dosya Yapısı
```
src/app/
├── services/
│   └── anket.ts      → Veri yönetimi
├── app.ts            → Ana component
├── app.html          → Arayüz şablonu
└── app.css           → Stiller
```

# Yönetici Paneli

Yönetici paneline erişmek için şifre: 1234

# Notlar
Uygulama npm start komutuyla başlatılmalıdır. 

VS Code'un "Run Without Debugging" seçeneği Bootstrap stillerini yüklemez.

Veriler sunucu gerektirmez tarayıcıda saklanır.

---
