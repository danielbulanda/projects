// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"


export var App = {
  run: function(){
    function AutoGrowTextArea(textField)
    {
      if (textField.clientHeight < textField.scrollHeight)
      {
        textField.style.height = textField.scrollHeight + "px";
        if (textField.clientHeight < textField.scrollHeight)
        {
          textField.style.height =
            (textField.scrollHeight * 2 - textField.clientHeight) + "px";
        }
      }
      console.log(textField)
    }
    var tags = document.getElementsByTagName("textarea");
    for (var i = 0; i < tags.length; i++) {
        AutoGrowTextArea(tags[i])
    }
  }
}