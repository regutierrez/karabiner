import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      {
        type: "basic",
        description: "Disable CMD + Tab to force Hyper Key usage",
        from: {
          key_code: "tab",
          modifiers: {
            mandatory: ["left_command"],
          },
        },
        to: [
          {
            key_code: "tab",
          },
        ],
      },
    ],
  },
  ...createHyperSubLayers({
    // q = "For ease of use
    q: {
      g: app("Arc"),
      v: app("Visual Studio Code"),
      // d: app("Discord"),
      s: app("Slack"),
      m: app("Mail"),
      // j: app("Pycharm Community Edition"),
      c: app("Calendar"),
      // n: app("Notion"),
      // t: app("Trello"),
      // z: app("zoom.us"),
      k: app("Alacritty"),
      0: app("Obsidian"), // letter o not working
      f: app("marta"),
      // l: app("Linear"),
      x: app("wpsoffice"),
      // w: app("Shottr"), 
      r: app("Foxit PDF Reader"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
