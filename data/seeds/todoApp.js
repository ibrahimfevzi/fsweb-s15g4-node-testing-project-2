/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const defaultGorevler = [{ Adi: "Sağlıklı Beslen", Aciklama: "Sağlıklı ol" }];
const defaultTasklar = [
  { Adi: "Spor Yap", Aciklama: "Spora Git", GorevId: 1 },
  { Adi: "Beslenmene Dikkat Et", Aciklama: "Meyve Ye", GorevId: 1 },
];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Tasklar").truncate();
  await knex("Gorevler").truncate();

  await knex("Gorevler").insert(defaultGorevler);
  await knex("Tasklar").insert(defaultTasklar);
};
