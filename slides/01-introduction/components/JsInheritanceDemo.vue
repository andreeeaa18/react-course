<template>
<LiveWeb code="class Vehicul {
  constructor(nume) {
    this.nume = nume;
  }

  claxoneaza() {
    console.log(`${this.nume} face un sunet.`);
  }
}

// MasinaElectrica moștenește de la Vehicul
class MasinaElectrica extends Vehicul {
  constructor(nume, capacitateBaterie) {
    super(nume); // Apelează constructorul clasei părinte (Vehicul)
    this.capacitateBaterie = capacitateBaterie;
  }

  // Suprascrierea (override) unei metode
  claxoneaza() {
    console.log(`${this.nume} face un sunet electric silențios.`);
  }

  // Metodă specifică subclasei
  incarca() {
    console.log(`${this.nume} se încarcă...`);
  }
}

const tesla = new MasinaElectrica('Tesla Model S', '100 kWh');
tesla.claxoneaza(); 
tesla.incarca();    
console.log('Nume:', tesla.nume);" consoleOnly editorHeight="500px" />
</template>
