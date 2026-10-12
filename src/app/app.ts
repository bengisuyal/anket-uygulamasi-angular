import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnketService, Soru, CevapKaydi } from './services/anket';
@Component(
  {
    selector:"app-root",
    standalone:true,
    imports:[CommonModule,FormsModule],
    templateUrl:'./app.html',
    styleUrl:"./app.css"
  }
)
export class App{
  guncelSayfa:string='anasayfa';
  sorular:Soru[]=[];
  rumuz:string='';
  verilenCevaplar:{ [soruId:number]:string}={};
  adminSifre:string='';
  adminGirisBasarili:boolean=false;
  yeniSoruMetni: string = '';
  yeniSoruTipi: 'coktan-secmeli' | 'klasik' = 'klasik';
  yeniSoruSecenekleri: string = '';
  kayitlar:CevapKaydi[]=[];
  soruEkle() {
  if (this.yeniSoruMetni.trim() === '') {
    alert('Lütfen soru metni giriniz!');
    return;
  }

  const yeniId = this.sorular.length > 0
    ? Math.max(...this.sorular.map(soru => soru.id)) + 1
    : 1;

  const yeniSoru: Soru = {
    id: yeniId,
    metin: this.yeniSoruMetni,
    tip: this.yeniSoruTipi
  };

  if (this.yeniSoruTipi === 'coktan-secmeli') {
    const secenekler = this.yeniSoruSecenekleri
      .split(',')
      .map(secenek => secenek.trim())
      .filter(secenek => secenek !== '');

    if (secenekler.length < 2) {
      alert('Çoktan seçmeli soru için en az 2 seçenek giriniz!');
      return;
    }
    yeniSoru.secenekler = secenekler;
  }

  this.sorular.push(yeniSoru);
  this.anketService.sorulariKaydet(this.sorular);

  this.yeniSoruMetni = '';
  this.yeniSoruTipi = 'klasik';
  this.yeniSoruSecenekleri = '';

  alert('Yeni soru eklendi.');
}
  constructor(public anketService:AnketService){
    this.sorular=this.anketService.getSorular();
    this.kayitlar = this.anketService.getCevapKayitlari();
  }
  get katilimciSayisi(): number {
    return this.anketService.getCevapKayitlari().length;
  }
  
  sayfaDegistir(yeniSayfa:string){
    this.guncelSayfa=yeniSayfa;
    if(yeniSayfa==='yönetici'&& this.adminGirisBasarili){
      this.kayitlar=this.anketService.getCevapKayitlari();
    }
  }
  cevapGonder(){
    if(this.rumuz.trim()===''){
      alert('Lütfen bir rumuz giriniz!');
      return;
    }
    this.anketService.cevapKaydet(this.rumuz,this.verilenCevaplar);
    alert('Cevaplarınız kaydedildi.Ankete katıldığınız için teşekkürler!');
    this.rumuz='';
    this.verilenCevaplar= {};
    this.sayfaDegistir('anasayfa');
  }
  yoneticiGirisiYap(){
    if(this.adminSifre==='1234'){
      this.adminGirisBasarili=true;
      this.kayitlar=this.anketService.getCevapKayitlari();
    }
    else {
      alert("Hatalı şifre girdiniz!");
    }
  }
  yoneticiCikisYap(){
    this.adminGirisBasarili=false;
    this.adminSifre='';
    this.sayfaDegistir('anasayfa');
  }
  soruyuSil(id:number){
    this.sorular=this.sorular.filter(soru=> soru.id!==id);
    this.anketService.sorulariKaydet(this.sorular);
  }
  sorulariKaydet(){
    this.anketService.sorulariKaydet(this.sorular);
    alert('Sorular kaydedildi.');
  }
}
