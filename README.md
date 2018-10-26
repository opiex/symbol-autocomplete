# Symbol Autocomplete

_Sketch plugin that turns the most basic elements into symbols._

## Usage

Select the layer you want to transform to a symbol and click cmd + ctrl + k.

### Supported transformations:

The following transformations are supported:

- **Wide rectangle with medium size** into `button`
- **Small square** into `checkbox`
- **Small circle** into radio `button`
- **Horizontal line** into text `input`
- **Full width rectangle at the bottom of the page** into `footer`
- **Full width rectangle at the top of the page** into `header`
- **Any text layer** into the symbol with the corresponding name (example: Text layer with the text 'btn-blue' into the symbol named `btn-blue`)


### Constraints

The symbol that will replace the selected shape needs to have a relevant word in the string to be recognized.
**For example:** A symbol called `Compononents/footer` would be identified as a footer.

In case two symbols have the word 'footer' in their name, the one with the shortest name would be the one selected.
**Examples:**
- A symbol called `Compononents/footer` would be identified as a footer even if there is a symbol called `Components/footer-dark`.
- A symbol called `footer` would be identified as a footer even if there is a symbol called `Components/footer`.
