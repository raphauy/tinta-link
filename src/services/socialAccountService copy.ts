import { prisma } from "@/lib/db";
import { getSocialNetwork } from "./socialNetworkService";
import { setImageFromInstagram } from "./userService";



export async function addSocialAccount(userId: string, socialNetworkId: string, nick: string) {
  

  const socialNetwork= await getSocialNetwork(socialNetworkId)
  if (!socialNetwork) throw new Error('Social network not found')

  const hrefTemplate= socialNetwork.hrefTemplate
  const href= hrefTemplate.replace('{nick}', nick)

  const maxOrder= await prisma.socialAccount.findFirst({
    where: {
      userId,
    },
    orderBy: {
      order: 'desc',
    },
  })

  const created = await prisma.socialAccount.create({
    data: {
      userId,
      socialNetworkId,
      href,
      order: maxOrder ? maxOrder.order + 1 : 1,
      title: socialNetwork.name,
    },
  })

  if (socialNetwork.name === 'Instagram') {
    await setImageFromInstagram(userId, nick)
  }

  return created
}

export async function getSocialAccounts(userId: string) {
  
    const found = await prisma.socialAccount.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        socialNetwork: true,
      },
    })
  
    return found;
}

// update social account funcion
export async function updateSocialAccount(id: string, title: string, href: string) {
  
  const updated= await prisma.socialAccount.update({
    where: {
      id
    },
    data: {
      title,
      href,
    }
  })

  return updated
}

export async function deleteSocialAccount(id: string) {
  const deleted= await prisma.socialAccount.delete({
    where: {
      id
    }
  })

  return deleted
}

export async function interchangeOrders(id1: string, id2: string) {
  const sa1= await prisma.socialAccount.findUnique({
    where: {
      id: id1
    }
  })

  const sa2= await prisma.socialAccount.findUnique({
    where: {
      id: id2
    }
  })

  if (!sa1 || !sa2) return false

  const order1= sa1.order
  const order2= sa2.order

  await prisma.socialAccount.update({
    where: {
      id: id1
    },
    data: {
      order: order2
    }
  })

  await prisma.socialAccount.update({
    where: {
      id: id2
    },
    data: {
      order: order1
    }
  })

  return true
}