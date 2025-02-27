import React , { useRef } from 'react';
import { sections } from './data';
import styles from "./TextWithTOC.module.scss"
import { Stack } from '../../../../shared/ui/Stack/Stack';
import { ActionButton } from '../../../../shared/ui/Buttons/ActionButton';

const TextWithTOC = () => {
    const titleRef = useRef(null); 

    const scrollToTitle = () => {
        if (titleRef.current) {
            titleRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Stack
            direction="column"
            className={styles.textWithToc}
            
        >
            <Stack
                direction='column'
                gap={16}
                align='alignStart'
                justify='justifyStart'
                className={styles.contentContainer}>
                <h2 ref={titleRef}>Context</h2>
                <ul>
                    {sections.map((section) => (
                        <li key={section.id}>
                            <a href={`#${section.id}`}>{section.title}</a>
                        </li>
                    ))}
                </ul>

                {sections.map((section) => (
                    <section key={section.id} id={section.id}>
                        <h3>{section.title}</h3>
                        <div>{section.content}</div>
                        
                    </section>
                ))}
            </Stack>

            <Stack className={styles.up}>
                <ActionButton 
                    variant="green"
                    onClick={scrollToTitle} // scroll
                >
                    Up
                </ActionButton>
            </Stack>
        </Stack>
    );
};

export default TextWithTOC;