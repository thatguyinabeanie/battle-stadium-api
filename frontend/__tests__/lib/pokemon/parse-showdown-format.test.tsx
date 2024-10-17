import { parseShowdownFormat } from "@/lib/pokemon/parse-showdown-format";
import { ParsedTeam } from "@/lib/pokemon/common";

describe("parseShowdownFormat", () => {
  it("should parse a valid Showdown format string into a ParsedTeam object", () => {
    const input = `
Pikachu @ Light Ball
Ability: Static
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Volt Tackle
- Iron Tail
- Quick Attack
- Thunder Wave

Charizard @ Charizardite X
Ability: Blaze
EVs: 252 Atk / 4 SpD / 252 Spe
Adamant Nature
- Flare Blitz
- Dragon Claw
- Roost
- Earthquake
`;

    const result: ParsedTeam = parseShowdownFormat(input);

    expect(result.pokemon.length).toBe(2);
    expect(result.pokemon[0]?.species).toBe("Pikachu");
    expect(result.pokemon[1]?.species).toBe("Charizard");
  });

  it("should throw an error if there are more than 6 Pokemon", () => {
    const input = `
Pikachu @ Light Ball
Ability: Static
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Volt Tackle
- Iron Tail
- Quick Attack
- Thunder Wave

Charizard @ Charizardite X
Ability: Blaze
EVs: 252 Atk / 4 SpD / 252 Spe
Adamant Nature
- Flare Blitz
- Dragon Claw
- Roost
- Earthquake

Bulbasaur @ Leftovers
Ability: Overgrow
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Giga Drain
- Sludge Bomb
- Leech Seed
- Protect

Squirtle @ Eviolite
Ability: Torrent
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Scald
- Rapid Spin
- Toxic
- Protect

Jigglypuff @ Leftovers
Ability: Cute Charm
EVs: 252 HP / 252 Def / 4 SpD
Bold Nature
- Hyper Voice
- Wish
- Protect
- Heal Bell

Meowth @ Silk Scarf
Ability: Technician
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Fake Out
- U-turn
- Knock Off
- Return

Eevee @ Eviolite
Ability: Adaptability
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Quick Attack
- Bite
- Iron Tail
- Protect
`;

    expect(() => parseShowdownFormat(input)).toThrow("A team cannot have more than 6 Pokemon.");
  });

  it("should handle input with no trailing newline", () => {
    const input = `
Pikachu @ Light Ball
Ability: Static
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Volt Tackle
- Iron Tail
- Quick Attack
- Thunder Wave`;

    const result: ParsedTeam = parseShowdownFormat(input);

    expect(result.pokemon.length).toBe(1);
    expect(result.pokemon[0]?.species).toBe("Pikachu");
  });
});
