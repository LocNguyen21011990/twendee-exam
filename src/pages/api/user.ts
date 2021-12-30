import "isomorphic-fetch"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface User {
  id: string,
  fullname: string,
  username: string,
  thumbnail: string
}

export async function getUsers (offSet: number, limit: number) {
  try {
    const res = await fetch(`https://randomuser.me/api/?page=${offSet}&results=${limit}`)
    const data = await res.json()
    let rs: any = []
    if(data.results) {
      data.results.map((user: any) => {
          rs.push({
            id: user.login.uuid,
            fullname: `${user.name.title} ${user.name.last} ${user.name.first}`,
            username: user.login.username,
            thumbnail: user.picture.thumbnail
          } as User)
      })
    }

    return rs
  } catch (error) {
    console.log(error)
  }
}
