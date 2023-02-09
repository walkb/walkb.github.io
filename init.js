const buttons = document.createElement('div');
buttons.classList.add('buttons');

const projects = document.createElement('div');
projects.classList.add('PROJECTS');


const labels = ["PROJECTS", "ABOUT", "LINKS", "RESUME"];
const projectlabels = ["POMODORO", "PORTFOLIO", "NOTEPAD"];

const bgcolors = ["#3e2936", "#242336", "#224a32", "#222e4a", "#292929"]
const projectcolors = ["#7F3A50", "#69232A", "#764B6C"];

const descriptions = ["my personal projects", "information about me", "linkedin github etc.", "current work experience and skills"];
const projectdescriptions = ["productivity timer made with js", "", "first c++ qt app"];

const links = ["somewhere", null, null, null, null];

const imgs = ["prj.png", "abt.png", "lnk.png", "rsm.png"];

const projecttexts = ["this is a text"];


const back = document.createElement('div');
back.classList.add('backbutton');
back.id = 'back';
back.style.backgroundColor = "#202020";
var color = changeBrightness("#202020", 4);
back.style.borderTopColor = color;

color = changeBrightness("#202020", 1.5);
back.style.borderRightColor = color;
back.style.borderLeftColor = color;

color = changeBrightness("#202020", 1);
back.style.borderBottomColor = color;

const backtext = back.appendChild(document.createElement('p'));
backtext.textContent = "BACK";
backtext.classList.add("backtext");


// initialize main menu buttons
createButtons(buttons, labels, bgcolors, imgs, descriptions);

// project buttons
createButtons(projects, projectlabels, projectcolors, imgs, projectdescriptions);
createInfoBoxes(projectlabels, projecttexts, projectcolors, links);

document.body.appendChild(back);
document.body.appendChild(buttons);
document.body.appendChild(projects);

function changeBrightness(rgb, percent) {
  // parse for hexcode values
  var r = parseInt(rgb.slice(1, 3), 16);
  var g = parseInt(rgb.slice(3, 5), 16);
  var b = parseInt(rgb.slice(5, 7), 16);
  // take min of 255 (max value) or percent times hexcode
  r = Math.min(255, Math.floor(r * percent));
  g = Math.min(255, Math.floor(g * percent));
  b = Math.min(255, Math.floor(b * percent));

  hexcode = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return hexcode;
}

function createButtons(container, labels, colors, images, descriptions) {
  for (let i = 0; i < labels.length; i++) {
    // button container and buttons
    const button = container.appendChild(document.createElement('div'));
    button.classList.add('button');
    button.id = labels[i];
    button.style.backgroundColor = colors[i];

    // button borders
    var color = changeBrightness(colors[i], 2);
    button.style.borderTopColor = color;

    color = changeBrightness(colors[i], 1.5);
    button.style.borderLeftColor = color;

    color = changeBrightness(colors[i], 0.5);
    button.style.borderBottomColor = color;

    // icon on left side of button
    const icon = button.appendChild(document.createElement('img'));
    icon.src = images[i];
    icon.classList.add('buttonicon');

    // text on right side of button
    const textbox = button.appendChild(document.createElement('div'));
    textbox.classList.add('buttontextcontainer');

    const header = textbox.appendChild(document.createElement('h1'));
    header.classList.add('buttonheader');
    header.textContent = labels[i]
    header.style.color = changeBrightness(colors[i], 4);

    const text = textbox.appendChild(document.createElement('h3'));
    text.classList.add('buttontext');
    if (descriptions.length == 0) {
      text.textContent = "insert a nice little description!";
    } else {
      text.textContent = descriptions[i];
    }
    text.style.color = changeBrightness(colors[i], 2);
    if (i == labels.length - 1) {
      button.style.marginBottom = "45px";
    }
  }
}


// this function creates all of the info boxes for a page
function createInfoBoxes(ids, text, colors, link) {
  for (var i = 0; i < ids.length; i++) {
    const container = document.createElement('div');
    container.classList.add(ids[i]);
    container.style.marginLeft = "100vw";
    container.style.width = "100vw";
    container.style.position = "absolute";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";

    const box = container.appendChild(document.createElement('div'));
    box.classList.add("infobox");

    box.style.backgroundColor = colors[i];

    var color = changeBrightness(colors[i], 2);
    box.style.borderTopColor = color;

    color = changeBrightness(colors[i], 1.5);
    box.style.borderLeftColor = color;
    box.style.borderRightColor = color;

    color = changeBrightness(colors[i], 0.5);
    box.style.borderBottomColor = color;

    color = changeBrightness(colors[i], 0.3);

    const header = box.appendChild(document.createElement('h1'));
    header.classList.add('infoheader');
    header.textContent = text;
    header.style.color = color;

    const textbox = box.appendChild(document.createElement('p'));
    textbox.classList.add('infotext');
    textbox.textContent = text;
    textbox.style.color = color;


    // if (link != null) {
    //   createLinkButton(box, link);
    // }
    document.body.appendChild(container);
    container.style.display = "none";
  }
}

// creates a link button to go to another page

// function createLinkButton(container, link) {
//   const button = document.createElement('a');
//   button.classList.add("buttonlink");
//   button.textContent = "button";
//   button.setAttribute("href", "www.google.com");
//   button.style.height = "100px";
//   button.style.width = "100px";
//   container.appendChild(button);
// }