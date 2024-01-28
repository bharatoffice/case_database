import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateCaseComponent } from './add-update-case/add-update-case.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConfrimationDialogComponent } from './confrimation-dialog/confrimation-dialog.component';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  allCases:any;
  constructor(
    private afs : AngularFirestore,
		private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const casesData = this.afs.collection('cases')
    casesData.valueChanges().subscribe((res)=>{
      this.allCases = res.filter((item:any) => !item.isDeleted);
    })
  }


  onOpenAddCaseDialog(){
    const dialog = this._matDialog.open(AddUpdateCaseComponent, {
			autoFocus: false,
			width: '610px',
			data: {
				heading: 'Select Pickup Point',
        item : null,
        mode : 'add'
			}
		})
  }

  onEdit(item:any, mode:string){
    const dialog = this._matDialog.open(AddUpdateCaseComponent, {
			autoFocus: false,
			width: '610px',
			data: {
        item : item,
        mode : mode
			}
		})
  }

  onDelete(item:any){
    const dialog = this._matDialog.open(ConfrimationDialogComponent, {
      autoFocus: false,
			width: '410px',
    })

    dialog.afterClosed().subscribe((res) => {
      if(res){
        console.log("primary", res);
        item['isDeleted'] = 1;
        const casesData = this.afs.collection('cases').doc(item['docId'])
        casesData.set(item).then((deletres)=>{
        })
      }
    })

  }
}
