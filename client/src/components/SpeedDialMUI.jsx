import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <LiveHelpIcon />, name: 'Help' },
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const [showSpeedDial, setShowSpeedDial] = React.useState(true);
  const navigate = useNavigate();

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClosePermanently = () => setShowSpeedDial(false);

  const handleActionClick = async (actionName) => {
    if (actionName === 'Print') {
      const canvas = await html2canvas(document.body);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'screenshot.png';
      link.click();
    } else if (actionName === 'Help') {
      navigate('/reviews');
    }
    setOpen(false);
  };

  if (!showSpeedDial) {
    return null;
  }

  return (
    <>
      <Backdrop open={open} />
      <Draggable>
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            icon={<SpeedDialIcon />}
            onClick={handleToggle}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() => handleActionClick(action.name)}
              />
            ))}
            <SpeedDialAction
              key="Close"
              icon={<CloseIcon />}
              tooltipTitle="Close"
              tooltipOpen
              onClick={handleClosePermanently}
            />
          </SpeedDial>
        </Box>
      </Draggable>
    </>
  );
}