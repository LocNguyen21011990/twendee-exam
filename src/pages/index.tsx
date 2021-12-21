/* eslint-disable react/no-children-prop */
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Icon, Input, InputGroup, InputLeftAddon, Select, Stack, Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import MyTable from '../components/Table'
import styles from '../styles/Home.module.css'
import { getUsers } from './api/user'

const Home: NextPage = () => {

  const [data, setData] = useState([])
  const [offSet, setOffSet] = useState(0)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    const getData = async () => {
      const data = await getUsers(offSet, limit)
      setData(data)
      return data
    }

    getData()
  }, [offSet, limit])

  const columns = useMemo(
    () => [
      {
        Header: 'Full Name',
        accessor: 'fullname',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Thumbnail Icon',
        accessor: 'thumbnail',
        Cell: (tableProps: { row: { original: { thumbnail: string | undefined } } }) => {
          return (
            <Image
              boxSize='100px'
              objectFit='cover'
              src={tableProps.row.original.thumbnail}
              alt={tableProps.row.original.thumbnail}
            />
          )
        }
      },
    ],
    [],
  )

  const previousPage = () => {
    setOffSet(offSet - 1)
  }

  const nextPage = () => {
    setOffSet(offSet + 1)
  }

  const goToPage = (e: ChangeEvent<HTMLInputElement>) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0
    setOffSet(page)
  }

  const setPageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tweendee Exam</title>
        <meta name="description" content="Develop by Luke Nguyen. Powered by NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          User Table
        </h1>

        <MyTable columns={columns} data={data}/>

        <Stack spacing={2} direction='row' align='center' mt={5}>
          <Button onClick={() => previousPage()} disabled={!offSet} colorScheme='teal' size='md'>
            <Icon as={ChevronLeftIcon} />
          </Button>
          <Button onClick={() => nextPage()} disabled={!((limit * offSet) <= 5000)} colorScheme='teal' size='md'>
            <Icon as={ChevronRightIcon} />
          </Button>
          <InputGroup>
            <InputLeftAddon children='Go to page' />
            <Input 
              type='number' 
              placeholder='Page'
              defaultValue={offSet+1}
              value={offSet+1}
              onChange={e => {
                goToPage(e)
              }}
            />
          </InputGroup>
          <Select 
            size='md' 
            value={limit}
            onChange={e => {
                setPageSize(e)
            }}>
              {[10, 20, 30, 40, 50].map(limit => (
                <option key={limit} value={limit}>
                Show {limit}
                </option>
              ))}
          </Select>
        </Stack>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Vercel
        </a>
      </footer>
    </div>
  )
}

export default Home
