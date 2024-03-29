import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { CovalentClient } from "@covalenthq/client-sdk";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/submit',
    image: (
      <div
        style={{
          alignItems: 'center',
          background:'#ce9a9e',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: '#251702 ',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        > How many Nfts do you own on the ETH blockchain? 
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Should I guess? (eth address)" />,
      <Button value="eth">Just a feather-soft tap will do the trick!</Button>,
    ],
  })
})


app.frame('/submit', async (c) => {
  const { buttonValue } = c
  const client = new CovalentClient(`${process.env.COVALENT_KEY}`);
  const neynar_client = new NeynarAPIClient(`${process.env.NEYNAR_API_KEY}`);
 
  let total_count
 
  try{
  if (buttonValue === "eth") {
    const resp = await client.NftService.getNftsForAddress("eth-mainnet");
    console.log(resp.data);}
}catch(e){
  return c.res({
    image: ( 
      <div
        style={{
          alignItems: 'center',
          background:
            'hsla(265, 53%, 29%, 1)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <span
          style={{
            color: '#e36414',
            fontSize: 60,
            fontStyle: 'italic',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          No Activity found on this chain !
        </span>

        </div>
        ),
       intents:[
        <Button.Reset>Go Back</Button.Reset>
       ]
  })
}
  try{
  const user = await neynar_client.lookupUserByVerification(c.inputText as any);
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            'hsla(265, 53%, 29%, 1)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
               <span
               style={{
                 color: '#e36414',
                 fontSize: 60,
                 fontStyle: 'normal',
                 letterSpacing: '-0.025em',
                 lineHeight: 1.4,
                 marginTop: 30,
                 padding: '0 120px',
                 whiteSpace: 'pre-wrap',
               }}
             >
               {user.result.user.displayName}'s stats
             </span>
        <span
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Total Transactions : {total_count}
        </span>
        <span
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          First Transaction : {earliest_trnasaction}
        </span>

        <span
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Recent Transaction : {latest_transaction}
        </span>
      </div>
    ),

    intents: [
      <Button.Link
        href={earliest_trnasaction_hash as string}>Earliest Tx</Button.Link>,
      <Button.Link
        href={latest_transaction_hash as string}>Recent Tx</Button.Link>,
        <Button.Reset>Go Back</Button.Reset>,
    ]
  })

}catch(e){
  try{
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            'hsla(265, 53%, 29%, 1)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Total Transactions : {total_count}
        </span>
        <span
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          First Transaction : {earliest_trnasaction}
        </span>

        <span
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Recent Transaction : {latest_transaction}
        </span>
      </div>
    ),

    intents: [
      <Button.Link
        href={earliest_trnasaction_hash as string}>Earliest Tx</Button.Link>,
      <Button.Link
        href={latest_transaction_hash as string}>Recent Tx</Button.Link>,
        <Button.Reset>Go Back</Button.Reset>,
    ]
  })
}catch(e){
  return c.res({
    image: ( 
      <div
        style={{
          alignItems: 'center',
          background:
            'hsla(265, 53%, 29%, 1)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <span
          style={{
            color: '#e36414',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          No Activity found on this chain
        </span>
       
      </div>
    ),
  })
}
}
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)