<template>
<LiveWeb code="class Masina {
  // Constructorul este apelat la crearea unei noi instanțe: new Masina(...)
  constructor(marca, model, an) {
    this.marca = marca;
    this.model = model;
    this.an = an;
    this.viteza = 0;
  }
  // Metodă a instanței
  accelereaza(valoare) {
    this.viteza += valoare;
    console.log(`Viteza a crescut la ${this.viteza} km/h.`);
  }
  // O altă metodă a instanței
  franeaza(valoare) {
    this.viteza -= valoare;
    if (this.viteza < 0) this.viteza = 0;
    console.log(`Viteza a scăzut la ${this.viteza} km/h.`);
  }
  afiseazaDetalii() {
    console.log(`Mașină: ${this.marca} ${this.model} din anul ${this.an}.`);
  }
}
// Crearea unei noi instanțe (un obiect) a clasei Masina
const masinaMea = new Masina('Dacia', 'Logan', 2023);
masinaMea.afiseazaDetalii(); 
masinaMea.accelereaza(50);   
masinaMea.franeaza(20);" consoleOnly editorHeight="500px" />
</template>
