import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview, ScheduleButton } from './styles'
import Image from 'next/image'
import previewImage from '../../assets/app-preview.png'
import { ClaimUserNameForm } from './components/ClaimUserNameForm'
import { NextSeo } from 'next-seo'
import { ArrowRight } from 'phosphor-react'
import router from 'next/router'

export default function Home() {
  async function handleNextStep() {
    router.push('/register/connect-calendar')
  }

  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Calendar Now"
        description="Conecte seu calendário e permita que as pessoas marquem agendamento no seu tempo livre"
      />
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUserNameForm />
          <ScheduleButton size="sm" onClick={handleNextStep}>
            Agendar
            <ArrowRight />
          </ScheduleButton>
          <Text size="sm">Já tem uma conta? Então conecte sua agenda</Text>
        </Hero>

        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Calendário de aplicação em funcionamento"
          />
        </Preview>
      </Container>
    </>
  )
}
