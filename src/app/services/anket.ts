import { Injectable } from '@angular/core';
export interface Soru{
  id: number;
  metin: string;
  tip:'coktan-secmeli' | 'klasik';
  secenekler?: string[];
}
export interface CevapKaydi{
  kullaniciAdi:string;
  tarih:string;
  cevaplar:{[soruId:number]:string};
}
@Injectable({
  providedIn: 'root'
})
export class AnketService {
  private sorularKey = 'anket_sorulari';
  private cevaplarKey = 'anket_cevap_kayitlari';

  constructor() {
    if (!localStorage.getItem(this.sorularKey)) {
      const varsayilanSorular: Soru[] = [
        {
          id:1, 
          metin: 'Yaşadığınız il hangisidir?',
          tip: 'coktan-secmeli',
          secenekler: ['İstanbul', 'Ankara', 'İzmir', 'Kocaeli', 'Bursa', 'Diğer']
        },
        {
          id:2,
          metin: 'Yaşadığınız bölgede en büyük çevre kirliliği sizce hangisidir?',
          tip: 'coktan-secmeli',
          secenekler: ['Hava Kirliliği', 'Plastik/Çöp Atıkları', 'Su/Deniz Kirliliği', 'Gürültü Kirliliği']
        },
      
        {
          id:3,
          metin: 'Geri dönüşüm kutularını düzenli olarak kullanıyor musunuz?',
          tip: 'coktan-secmeli',
          secenekler: ['Kesinlikle Evet', 'Bazen', 'Hayır, dikkat etmiyorum']
        },
        {
          id:4,
          metin: 'Çevre kirliliğini önlemek için ne gibi önerilerde bulunmak istersiniz?',
          tip: 'klasik'
        },
        {
          id:5,
          metin:'Tek kullanımlık plastiklerin (poşet, şişe vb.) yasaklanmasını destekliyor musunuz?',
          tip:'coktan-secmeli',
          secenekler: ['Evet', 'Hayır', 'Kararsızım'] 
        },
        {
          id:6,
          metin: 'Şehir içi ulaşımda çevre dostu alternatifleri ne sıklıkla tercih edersiniz?', 
          tip: 'coktan-secmeli', 
          secenekler: ["Her zaman", "Ara sıra", "Hiç tercih etmem"] 
        },
        {
           id: 7, 
           metin: 'Günlük hayatınızda çevre bilincini artırmak için bireysel olarak yaptığınız özel bir uygulama var mı? Varsa kısaca anlatınız.', 
           tip: 'klasik'
        }
        

      ];

      localStorage.setItem(this.sorularKey, JSON.stringify(varsayilanSorular));
    }
  }
    getSorular(): Soru[] {
    const data = localStorage.getItem(this.sorularKey);
    return data ? JSON.parse(data) : [];
  }

  sorulariKaydet(yeniSorular: Soru[]) {
    localStorage.setItem(this.sorularKey, JSON.stringify(yeniSorular));
  }

  cevapKaydet(kullaniciAdi: string, cevaplar: { [soruId: number]: string }) {
    const kayitlar = this.getCevapKayitlari();
    const yeniKayit: CevapKaydi = {
      kullaniciAdi: kullaniciAdi.trim(),
      tarih: new Date().toLocaleString('tr-TR'),
      cevaplar: cevaplar
    };
    kayitlar.push(yeniKayit);
    localStorage.setItem(this.cevaplarKey, JSON.stringify(kayitlar));
  }
  getCevapKayitlari(): CevapKaydi[] {
    const data = localStorage.getItem(this.cevaplarKey);
    return data ? JSON.parse(data) : [];
  }
}