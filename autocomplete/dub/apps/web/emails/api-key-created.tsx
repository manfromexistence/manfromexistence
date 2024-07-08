import { DUB_LOGO, formatDate } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

export default function APIKeyCreated({
  email = "panicking@thedis.co",
  apiKeyName = "Acme",
}: {
  email: string;
  apiKeyName: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>New API Key Created</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_LOGO}
                width="40"
                height="40"
                alt="Dub.co"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              New API Key Created
            </Heading>
            <Text className="text-sm leading-6 text-black">
              You created a new API key for your Dub.co account with the name{" "}
              <strong>"{apiKeyName}"</strong> on{" "}
              {formatDate(new Date().toString())}.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href="https://app.dub.co/settings/tokens"
              >
                View API Keys
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              If you did not create this API key, you can{" "}
              <Link
                href="https://app.dub.co/settings/tokens"
                className="text-black underline"
              >
                <strong>delete this key</strong>
              </Link>{" "}
              from your account.
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
