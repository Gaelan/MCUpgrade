let toVersion;

$('[name=to]').on('change', function() {
  toVersion = $('input[name=to]:checked').val();
  $('#dropzone').show();
});

function readFolder(reader) {
  reader.readEntries((files) => {
    if(files.length > 0) {
      files.forEach((file) => {
        if(file.isDirectory) {
          readFolder(file.createReader())
        } else {
          handleName(file.name);
        }
      })
    } else {
      readFolder(reader);
    }
  }, (error) => {
    alert(error);
  })
}

function handleName(name) {
  let category = 'unknown'
  let modName = name;
  for(testName in DATA) {
    if(name.indexOf(testName) != -1) {
      modName = testName
      if(DATA[testName] == 'ignore') {
        return;
      }
      category = DATA[testName][toVersion];
      break;
    }
  }
  $('#result-card-' + category).show();
  $('#result-target-' + category).append('<li class="list-group-item">' + modName + '</li>')
}


var dropzone = document.getElementById('dropzone');
dropzone.ondrop = function(e) {
  $('#wizard').hide();
  $('#results').show();
  e.preventDefault();
  var length = e.dataTransfer.items.length;
  for (var i = 0; i < length; i++) {
    var entry = e.dataTransfer.items[i].webkitGetAsEntry();
    if (entry.isFile) {
      alert("That's a file. Wat? Drop your entire mods folder.")
    } else if (entry.isDirectory) {
      const reader = entry.createReader()
      readFolder(reader)
    }
  }
};

dropzone.ondragover = function(e) {
  e.preventDefault();
}