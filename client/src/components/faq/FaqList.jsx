import { useState, useContext } from 'react';
import { DarkMode } from '../../App';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
        question: 'What is dashboard software?',
        answer: 'Dashboard software is a tool that allows you to visualize data in an easily consumable format. It can help you track key metrics, identify trends, and make informed decisions.'
    },
    {
        question: 'What types of data can be displayed on a dashboard?',
        answer: 'Dashboards can display a wide range of data, including sales figures, website traffic, customer demographics, social media analytics, and much more. The types of data displayed will depend on the needs of the user.'
    },
    {
        question: 'What are some common features of dashboard software?',
        answer: 'Common features of dashboard software include drag-and-drop functionality, customizable dashboards, real-time data updates, data visualization tools, and the ability to share data with others.'
    },
    {
        question: 'Can I create my own dashboards with dashboard software?',
        answer: 'Yes, most dashboard software allows users to create their own dashboards using pre-built templates or by designing their own layouts from scratch.'
    },
    {
        question: 'How secure is dashboard software?',
        answer: 'Dashboard software can be secure as long as proper security measures are taken, such as using strong passwords and ensuring that data is encrypted when being transmitted or stored.'
    },
    {
        question: 'Is dashboard software difficult to learn and use?',
        answer: 'Most dashboard software is designed to be user-friendly and easy to learn. However, the ease of use can vary depending on the complexity of the software and the user\'s level of technical expertise.'
    },
    {
        question: 'Can dashboard software integrate with other tools?',
        answer: 'Yes, many dashboard software solutions offer integrations with other tools such as CRM software, marketing automation platforms, and social media management tools.'
    },
    {
        question: 'Is dashboard software expensive?',
        answer: 'The cost of dashboard software can vary depending on the provider and the level of functionality required. Some dashboard software solutions offer free or low-cost plans, while others can be quite expensive.'
    },
    {
        question: 'How can I choose the right dashboard software for my business?',
        answer: 'When choosing dashboard software, consider factors such as the type of data you need to display, the level of customization required, the ease of use, and the cost.'
    },
    {
        question: 'Can dashboard software help me make better business decisions?',
        answer: 'Yes, dashboard software can provide valuable insights that can help you make informed business decisions. By tracking key metrics and identifying trends, dashboard software can help you stay ahead of the competition and make data-driven decisions.'
    }
]

export default function FaqList() {
    const isDarkModeEnabled = useContext(DarkMode);
    const [expanded, setExpanded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handleChange = (panel, index) => (event, isExpanded) => {
        handleIndex(index)
        setExpanded(isExpanded ? panel : false);
    };

    const handleIndex = (index) => {
        setCurrentIndex(index);
    }

    return (
        <div>
            {
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
            }
        </div >
    );
}