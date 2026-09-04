const K = require('./yellow_kit.js'); const sharp = require('sharp'); const path = require('path');
const NAMES = ['FiNavigation','FiMapPin','FiCalendar','FiClock','FiSun','FiCloud','FiThermometer','FiZap','FiDollarSign','FiLock','FiShield','FiEyeOff','FiCamera','FiCameraOff','FiPhone','FiMail','FiBriefcase','FiBookOpen','FiUsers','FiHome','FiTruck','FiGlobe','FiWifi','FiCheckSquare','FiInfo','FiAlertTriangle','FiUser','FiKey','FiSend','FiCoffee','FiCreditCard','FiSmartphone','FiMessageSquare','FiFileText','FiHelpCircle','FiUmbrella','FiStar','FiTool','FiSettings','FiFlag',
  'MdFlight','MdFlightTakeoff','MdFlightLand','MdHotel','MdDirectionsCar','MdOutlineFactory','MdEngineering','MdOutlineHandshake','MdOutlineLuggage','MdOutlineBadge','MdOutlineHealthAndSafety','MdOutlineMeetingRoom','MdOutlineWbSunny','MdOutlinePower','MdOutlineBolt','MdOutlineVisibilityOff','MdOutlineNoPhotography','MdOutlineChecklist','MdOutlineSchedule','MdOutlineDirectionsBus'];
(async () => {
  const ok = [], bad = []; const tiles = [];
  for (const n of NAMES) { try { const f = await K.icon(n, '000000', 128); ok.push(n); tiles.push({ n, f }); } catch (e) { bad.push(n); } }
  console.log('ok', ok.length, 'missing:', bad.join(','));
  // contact sheet with labels
  const cols = 10, tw = 150, th = 170; const rows = Math.ceil(tiles.length / cols);
  const comps = []; const svgLabels = [];
  for (let i = 0; i < tiles.length; i++) { const x = (i % cols) * tw + 11, y = Math.floor(i / cols) * th + 8; comps.push({ input: tiles[i].f, left: x, top: y }); svgLabels.push(`<text x="${x + 64}" y="${y + 150}" font-size="11" text-anchor="middle" font-family="sans-serif">${tiles[i].n}</text>`); }
  const lab = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cols * tw}" height="${rows * th}">${svgLabels.join('')}</svg>`);
  await sharp({ create: { width: cols * tw, height: rows * th, channels: 3, background: '#ffffff' } }).composite([...comps, { input: lab, left: 0, top: 0 }]).png().toFile('yellow/gen/icon_sheet.png');
})();
