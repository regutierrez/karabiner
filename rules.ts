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
      a: app("Android Studio"),
      g: app("Arc"),
      v: app("Visual Studio Code"),
      f: app("Finder"),
      d: app("Discord"),
      s: app("Slack"),
      // m: app("Messages"),
      m: app("Mail"), 
      // j: app("Pycharm Community Edition"),
      c: app("Calendar"),
      // n: app("Notion"),
      z: app("zoom.us"),
      t: app("WezTerm"),
      0: app("Obsidian"), // letter o not working
      b: app("Bitwarden"),
      // l: app("Linear"),
      // x: app("Microsoft Excel"),
      // w: app("Parallels Desktop"), 
      // f: app("Firefox"),
      // p: app("Foxit PDF Reader"),
      r: app("Reminders"),
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
