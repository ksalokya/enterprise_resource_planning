import { useState, useContext, useEffect } from "react";
import { DarkMode } from '../../App'
import {
    DocumentEditorContainerComponent,
    Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
import Header from '../header/Header'
import useMediaQuery from '@mui/material/useMediaQuery';
import './document.css'

import lightMode from "./light.txt";
import darkMode from "./dark.txt"

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

DocumentEditorContainerComponent.Inject(Toolbar);

function Document() {
    const isDarkModeEnabled = useContext(DarkMode);
    const [lightText, setLightText] = useState(false);
    const [darkText, setDarkText] = useState(false);

    function lightModeCss() {
        fetch(lightMode)
            .then((r) => r.text())
            .then(text => {
                const styleTag = document.getElementById('theme');
                styleTag.innerHTML = text;
                setLightText(true);
                setDarkText(false);
            })
    };

    function darkModeCss() {
        fetch(darkMode)
            .then((response) => response.text())
            .then((text) => {
                const styleTag = document.getElementById('theme');
                styleTag.innerHTML = text;
                setLightText(false);
                setDarkText(true);
            });
    };

    useEffect(() => {
        if (isDarkModeEnabled) darkModeCss();
        else lightModeCss();
    }, [isDarkModeEnabled])


    const matches = useMediaQuery('(max-width:900px)');
    const [displayPropertiesPane, setDisplayPropertiesPane] = useState(true);
    useEffect(() => {
        if (matches) setDisplayPropertiesPane(false);
        else setDisplayPropertiesPane(true);
    }, [matches])

    return (
        <>
            {
                (isDarkModeEnabled && darkText) || (!isDarkModeEnabled && lightText) ?



                    <div className='document'>
                        <Header title='Editor' />
                        <DocumentEditorContainerComponent
                            height={'82%'}
                            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                            enableToolbar={true}
                            showPropertiesPane={displayPropertiesPane}
                        />
                    </div> :
                    <Box sx={{
                        width: 600,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <Skeleton variant="rounded" />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
            }
        </>
    )
}

export default Document