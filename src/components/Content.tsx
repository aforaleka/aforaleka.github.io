import React from "react"

import styled, { ThemeProvider } from "styled-components";

import { ModeContext } from "..";
import { ModeMapping, ModeOption } from './modes/ModeConfig';


const Content: React.VFC = () => {
    const mode = React.useContext(ModeContext) as ModeOption;
    return (
        <Wrapper>
            <ThemeProvider theme={ModeMapping[mode].bionic}>
                <Section>
                    <p><Bionic>Hel</Bionic>lo <Bionic>wor</Bionic>ld! <Bionic >I</Bionic>'m <b>Aleka Cheung</b>.</p>
                    <p>
                        <Bionic>Softwa</Bionic>re <Bionic>engine</Bionic>er <Bionic>bas</Bionic>ed <Bionic>i</Bionic>n <Bionic>NY</Bionic>C.{' '}
                        <Bionic>Backgrou</Bionic>nd <Bionic>i</Bionic>n <Bionic>Comput</Bionic>er <Bionic>Scien</Bionic>ce +{' '}
                        <Bionic>Cogniti</Bionic>ve <Bionic>Scien</Bionic>ce <Bionic>fro</Bionic>m <Bionic>Northweste</Bionic>rn.{' '}
                        <Bionic>Work</Bionic>ed <Bionic>o</Bionic>n{' '}
                        <ProjectLink href="https://about.instagram.com/features/shopping" target="_blank" rel="noreferrer"><Bionic>Instagr</Bionic>am <Bionic>Shoppi</Bionic>ng</ProjectLink>,{' '}
                        <ProjectLink href="https://wit.ai/" target="_blank" rel="noreferrer"><Bionic>Wit.</Bionic>ai</ProjectLink>, <Bionic>an</Bionic>d{' '}
                        <ProjectLink href="https://www.messenger.com/features" target="_blank" rel="noreferrer"><Bionic>Messeng</Bionic>er</ProjectLink>.{' '}
                        <Bionic>Current</Bionic>ly <Bionic>havi</Bionic>ng <Bionic>fu</Bionic>n <Bionic>wit</Bionic>h <Bionic>Three.</Bionic>js{' '}
                        (<Bionic>e.</Bionic>g. <Bionic>behi</Bionic>nd <Bionic>m</Bionic>e!){' '}
                        <Bionic>an</Bionic>d <Bionic>explori</Bionic>ng <Bionic>ful</Bionic>l-<Bionic>sta</Bionic>ck +{' '}
                        <Bionic>fro</Bionic>nt-<Bionic>en</Bionic>d <Bionic>opportunit</Bionic>ies 👀.
                    </p>
                </Section>



                <Section>
                    <div>
                        <span><Bionic>Fin</Bionic>d <Bionic>m</Bionic>e <Bionic>o</Bionic>n: </span>
                        <a href="https://github.com/aforaleka" target="_blank" rel="noreferrer"><Bionic>gith</Bionic>ub</a>{' // '}
                        <a href="https://medium.com/@alekac" target="_blank" rel="noreferrer"><Bionic>medi</Bionic>um</a>{' // '}
                        <a href="https://www.linkedin.com/in/alekacheung/" target="_blank" rel="noreferrer"><Bionic>linked</Bionic>in</a>{' // '}
                        <a href="https://open.spotify.com/user/aleka." target="_blank" rel="noreferrer"><Bionic>spoti</Bionic>fy</a>{' // '}
                        <a href="https://www.instagram.com/____aleka/" target="_blank" rel="noreferrer"><Bionic>i</Bionic>g</a>{' // '}
                        <a href="mailto:alekacheung@gmail.com" target="_blank" rel="noreferrer"><Bionic>ema</Bionic>il</a>
                    </div>
                </Section>
            </ThemeProvider>
        </Wrapper >
    )
}


const Wrapper = styled.div`
    cursor: default;
    height: 100%;
    max-width: 550px;
    min-width: 330px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 0 2em;
    margin: 0 auto;
    z-index: 2;
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 2;
`

const ProjectLink = styled.a`
    border-bottom: 2px solid var(--color-text-underline);   
`

const Bionic = styled.span`
    font-weight: ${props => props.theme.fontWeight}
`

export default Content