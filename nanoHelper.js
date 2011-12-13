
// nanoHelper.js

autowatch = 1;
this.outlets = 18;

function sendNano (slider, val) {
    switch (slider) {
    case 2:
        outlet(0, val);
        break;
    case 3:
        outlet(1, val);
        break;
    case 4:
        outlet(2, val);
        break;
    case 5:
        outlet(3, val);
        break;
    case 6:
        outlet(4, val);
        break;
    case 8:
        outlet(5, val);
        break;
    case 9:
        outlet(6, val);
        break;
    case 12:
        outlet(7, val);
        break;
    case 14:
        outlet(8, val);
        break;
    case 15:
        outlet(9, val);
        break;
    case 16:
        outlet(10, val);
        break;
    case 17:
        outlet(11, val);
        break;
    case 18:
        outlet(12, val);
        break;
    case 19:
        outlet(13, val);
        break;
    case 20:
        outlet(14, val);
        break;
    case 21:
        outlet(15, val);
        break;
    case 22:
        outlet(16, val);
        break;
    case 13:
        outlet(17, val);
        break;
    default:
        break;
    }
}