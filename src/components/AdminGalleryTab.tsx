import { useState } from "react";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GalleryImage, addGalleryImage, deleteGalleryImage, getCategories } from "@/lib/gallery";
import { useToast } from "@/hooks/use-toast";

interface AdminGalleryTabProps {
  images: GalleryImage[];
  onRefresh: () => void;
}

const AdminGalleryTab = ({ images, onRefresh }: AdminGalleryTabProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ src: "", alt: "", category: "" });
  const { toast } = useToast();
  const categories = getCategories();

  const handleAdd = () => {
    if (!form.src.trim()) {
      toast({ title: "Image URL is required", variant: "destructive" });
      return;
    }
    if (!form.category) {
      toast({ title: "Please select a category", variant: "destructive" });
      return;
    }
    addGalleryImage({
      src: form.src.trim(),
      alt: form.alt.trim() || "Gallery image",
      category: form.category,
    });
    toast({ title: "Photo added to gallery" });
    setForm({ src: "", alt: "", category: "" });
    setDialogOpen(false);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    deleteGalleryImage(id);
    toast({ title: "Photo removed from gallery" });
    onRefresh();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">{images.length} custom photo(s)</p>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Photo
        </Button>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No custom gallery photos yet.</p>
          <p className="text-sm text-muted-foreground mb-6">
            Default gallery images are always shown. Add custom photos to extend the gallery.
          </p>
          <Button onClick={() => setDialogOpen(true)}>Add your first photo</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="group relative rounded-lg border border-border overflow-hidden">
              <div className="aspect-[4/3] bg-muted">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{image.alt}</p>
                  <p className="text-xs text-muted-foreground">{image.category}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Photo</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove "{image.alt}" from the gallery.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(image.id)}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Photo to Gallery</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="gallery-src">Image URL *</Label>
              <Input
                id="gallery-src"
                value={form.src}
                onChange={(e) => setForm((p) => ({ ...p, src: e.target.value }))}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div>
              <Label htmlFor="gallery-alt">Description</Label>
              <Input
                id="gallery-alt"
                value={form.alt}
                onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))}
                placeholder="e.g. Sunset over the resort pool"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Photo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminGalleryTab;
