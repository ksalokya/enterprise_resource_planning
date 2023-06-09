import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { DarkMode } from '../../App';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ComponentLoader from "../loader/ComponentLoader"


export default function FaqList() {
    const isDarkModeEnabled = useContext(DarkMode);
    const [expanded, setExpanded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const [faqs, setFaqs] = useState();

    // TODO :: Handle userID
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/faq/get/${1}`)
            .then((res) => {
                if (res.status === 200) {
                    setFaqs(res.data);
                }
            })
            .catch((err) => console.log(err))
    }, [])

    const handleChange = (panel, index) => (event, isExpanded) => {
        handleIndex(index)
        setExpanded(isExpanded ? panel : false);
    };

    const handleIndex = (index) => setCurrentIndex(index);

    return (
        <div>
            {
                faqs ?
                    faqs.map((ele, index) => {
                        return (
                            <Accordion
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`, index)}
                                key={index}
                                sx={{
                                    marginBottom: '10px',
                                    boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
                                    backgroundColor: isDarkModeEnabled ? '#121212' : '',
                                    color: isDarkModeEnabled ? '#fff' : ''
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: isDarkModeEnabled ? '#fff' : '' }} />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={{
                                        padding: '10px'
                                    }}
                                >
                                    <Typography sx={{ width: '40%', flexShrink: 0 }}>
                                        {ele.question}
                                    </Typography>
                                    <Typography sx={{
                                        color: isDarkModeEnabled ? '#cccccc' : 'text.secondary',
                                        display: expanded && (index === currentIndex) ? 'none' : '',
                                        marginLeft: '10%'
                                    }}>
                                        {ele.answer.slice(0, 50) + "..."}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {ele.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                    :
                    <ComponentLoader />
            }
        </div >
    );
}