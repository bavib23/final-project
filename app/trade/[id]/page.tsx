import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserNoteBySessionToken,
} from '../../../database/users';

type CoinMarketCapCrypto = {
  id: number;
  name: string;
  image: string;
  quote: { USD: { price: number } };
};

async function getCryptos(): Promise<CoinMarketCapCrypto[]> {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY,
        },
      },
    );

    return response.data.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Trade() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/notes');

  // Display the notes for the current logged in user
  const userNote = await getUserNoteBySessionToken(sessionTokenCookie.value);
  console.log(userNote);
  console.log('Checking: ', userNote);
  const cryptos = await getCryptos();
  console.log(cryptos);

  function getCryptoImage(
    id: number,
    size: '32x32' | '64x64' | '128x128',
  ): string {
    return `https://s2.coinmarketcap.com/static/img/coins/${size}/${id}.png`;
  }

  // Vorbereitung d Coin API
  // create from existing, dort sie cmd line
  // HOW TO LOAD ASYNC DATA WITH REACT
  // put API KEY in .env file!

  return (
    <div>
      <p className="text-xl ">Trade</p>
      <div className="min-w-[50%]">
        <table className="table table-auto table-lg">
          {/* head */}
          <thead>
            <tr>
              <th>icon</th>
              <th>asset</th>
              <th>price in USD</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto.id}>
                <td>
                  <Image
                    src={getCryptoImage(crypto.id, '64x64')}
                    alt={crypto.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td>
                  <Link href={`/trade/${crypto.id}`}>{crypto.name}</Link>
                </td>
                <td>{crypto.quote.USD.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-6 items-center">
        {userNote.length > 0 ? (
          <>
            <h2 className="block text-sm font-bold mb-2">Your Balance</h2>
            <ul className="flex flex-col gap-6 items-center">
              {userNote.map((note) => (
                <li key={`animal-div-${note.noteId}`}>{note.textContent}</li>
              ))}
            </ul>
          </>
        ) : (
          <h2></h2>
        )}
        {/* <label className="block text-sm font-bold mb-2">

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
          />
        </label> */}
        {/* <p>0.001324511 Bitcoin</p> */}
        {/* <button className="btn btn-neutral">Confirm</button> */}
      </div>
    </div>
  );
}
