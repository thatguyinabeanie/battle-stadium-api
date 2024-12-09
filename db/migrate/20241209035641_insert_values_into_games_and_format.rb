class InsertValuesIntoGamesAndFormat < ActiveRecord::Migration[7.2]
  def change
    add_column :games, :slug, :string, null: false
    add_index :games, :slug, unique: true

    sv = Game.create(name: "Scarlet & Violet", slug: "sv")
    swsh = Game.create(name: "Sword & Shield", slug: "swsh")
    lgpe = Game.create(name: "Let's Go Pikachu & Eevee", slug: "lgpe")
    bdsp = Game.create(name: "Brilliand Diamond & Shining Pearl", slug: "bdsp")
    pogo = Game.create(name: "Pokemon Go", slug: "pogo")

    Format.create(name: "Regulation A", game: sv)
    Format.create(name: "Regulation B", game: sv)
    Format.create(name: "Regulation C", game: sv)
    Format.create(name: "Regulation D", game: sv)
    Format.create(name: "Regulation E", game: sv)
    Format.create(name: "Regulation F", game: sv)
    Format.create(name: "Regulation G", game: sv)
    Format.create(name: "Regulation H", game: sv)
    Format.create(name: "Regulation I", game: sv)
    Format.create(name: "Regulation J", game: sv)

    Format.create(name: "Series 1", game: swsh)
    Format.create(name: "Series 2", game: swsh)
    Format.create(name: "Series 3", game: swsh)
    Format.create(name: "Series 4", game: swsh)
    Format.create(name: "Series 5", game: swsh)
    Format.create(name: "Series 6", game: swsh)
    Format.create(name: "Series 7", game: swsh)
    Format.create(name: "Series 8", game: swsh)
    Format.create(name: "Series 9", game: swsh)
    Format.create(name: "Series 10", game: swsh)
    Format.create(name: "Series 11", game: swsh)
    Format.create(name: "Series 12", game: swsh)
    Format.create(name: "Series 13", game: swsh)

    Format.create(name: "National Dex", game: lgpe)
    Format.create(name: "National Dex", game: bdsp)

    Format.create(name: "Great League", game: pogo)
    Format.create(name: "Ultra League", game: pogo)
    Format.create(name: "Master League", game: pogo)
  end
end
