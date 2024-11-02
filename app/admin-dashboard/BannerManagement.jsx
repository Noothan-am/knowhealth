import React, { useState } from 'react'
import Image from 'next/image'
import { Upload, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialBanners = [
  {
    id: 1,
    name: 'Summer Health Campaign',
    image: '/placeholder.svg?height=300&width=800',
  },
  {
    id: 2,
    name: 'New Diagnostic Center Opening',
    image: '/placeholder.svg?height=300&width=800',
  },
  {
    id: 3,
    name: 'COVID-19 Vaccination Drive',
    image: '/placeholder.svg?height=300&width=800',
  },
]

const BannerManagement = () => {
  const [banners, setBanners] = useState(initialBanners)
  const [bannerTitle, setBannerTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (bannerTitle && selectedFile) {
      const newBanner = {
        id: Date.now(),
        name: bannerTitle,
        image: URL.createObjectURL(selectedFile),
      }
      setBanners([...banners, newBanner])
      setBannerTitle('')
      setSelectedFile(null)
    } else {
      console.log('Please provide a title and select a file')
    }
  }

  const handleDelete = (id) => {
    setBanners(banners.filter(banner => banner.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Upload New Banner</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="banner-title">Banner Title</Label>
            <Input
              id="banner-title"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              placeholder="Enter banner title"
            />
          </div>
          <div>
            <input
              type="file"
              id="banner-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Label htmlFor="banner-upload" className="cursor-pointer">
              <div className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                <Upload className="h-5 w-5" />
                <span>{selectedFile ? selectedFile.name : 'Select Banner Image'}</span>
              </div>
            </Label>
          </div>
          <Button onClick={handleUpload} disabled={!bannerTitle || !selectedFile}>
            Upload Banner
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Banners</h2>
        <div className="grid gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={banner.image}
                  alt={banner.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{banner.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(banner.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BannerManagement