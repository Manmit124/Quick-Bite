import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const Editcategory = () => {
  return (
    <Dialog >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the Category</DialogTitle>
        </DialogHeader>
        <Input
            //   type="text"
            //   placeholder="enter the category"
            //   value={newcategoryname}
            //   onChange={(e) => setnewcategoryname(e.target.value)}
            />
      
            <DialogFooter className="gap-1 sm:gap-0">
            
                <Button
                
                //   onClick={() => deleteNote()}
                //   variant="destructive"
                //   disabled={form.formState.isSubmitting}
                //   type="button"
                >
                  Delete Note
                </Button>
             
              <Button
                type="submit"
             
               
              >
                Submit
              </Button>
            </DialogFooter>
       
      </DialogContent>
    </Dialog>
  )
}

export default Editcategory
