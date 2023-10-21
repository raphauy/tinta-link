import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding...")
  
  const adminUser= await seedAdmin()
  console.log({ adminUser })

  const socialNetworks = await seedSocialNetworks()
  console.log({ socialNetworks })
  
}

const socialNetworks = [
  {
    name: "Instagram",
    icon: "BsInstagram",
    color: "#E1306C",
    hrefTemplate: "https://instagram.com/{nick}",
    order: 1,
  },
  {
    name: "Twitter",
    icon: "BsTwitter",
    color: "#1DA1F2",
    hrefTemplate: "https://twitter.com/{nick}",
    order: 2,
  },
  {
    name: "Facebook",
    icon: "BsFacebook",
    color: "#1877F2",
    hrefTemplate: "https://facebook.com/{nick}",
    order: 3,
  },
  {
    name: "LinkedIn",
    icon: "BsLinkedin",
    color: "#2867B2",
    hrefTemplate: "https://linkedin.com/in/{nick}",
    order: 4,
  },
  {
    name: "Portafolio de vinos",
    icon: "Wine",
    color: "#800020",
    hrefTemplate: "https://{nick}",
    order: 5,
  },
  {
    name: "WhatsApp",
    icon: "BsWhatsapp",
    color: "#25D366",
    hrefTemplate: "https://wa.me/{nick}",
    order: 6,
  },
  {
    name: "TikTok",
    icon: "BsTiktok",
    color: "#000",
    hrefTemplate: "https://tiktok.com/{nick}",
    order: 7,
  },
  {
    name: "YouTube",
    icon: "BsYoutube",
    color: "#FF0000",
    hrefTemplate: "https://youtube.com/{nick}",
    order: 8,
  },
  {
    name: "Twitch",
    icon: "BsTwitch",
    color: "#9146FF",
    hrefTemplate: "https://twitch.tv/{nick}",
    order: 9,
  },
  {
    name: "GitHub",
    icon: "BsGithub",
    color: "#333",
    hrefTemplate: "https://github.com/{nick}",
    order: 10,
  },
  {
    name: "Sitio Web",
    icon: "BsLink45Deg",
    color: "#000",
    hrefTemplate: "https://{nick}",
    order: 11,
  },
]

async function seedSocialNetworks() {
  const socialNetworksCreated = await Promise.all(
    socialNetworks.map((socialNetwork) =>
      prisma.socialNetwork.create({ data: socialNetwork })
    )
  )

  return socialNetworksCreated
}

async function seedAdmin() {
  const adminUser = await prisma.user.create({
    data: {
      name: "Rapha",
      email: "rapha.uy@rapha.uy",
      role: "admin"
    },
  })

  return adminUser
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
