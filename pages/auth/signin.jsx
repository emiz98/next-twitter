import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'
import Head from 'next/head'

function signin({ providers }) {
  return (
    <div className="bg-black">
      <Head>
        <title>Twitter 1.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex h-screen flex-col items-center justify-center py-2 px-4
        text-center text-white"
      >
        <img className="w-32" src="/twitter.png" alt="" />
        <p className="font-xs mt-4 italic">
          This is not a real app, It is built only for educational purposes
          only.
        </p>
        <div className="mt-16">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-twitter p-3 font-medium text-white hover:bg-twitterHover"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: '/' })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default signin
