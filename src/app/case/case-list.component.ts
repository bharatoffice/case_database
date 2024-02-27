import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateCaseComponent } from './add-update-case/add-update-case.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConfrimationDialogComponent } from './confrimation-dialog/confrimation-dialog.component';
import { ExcelService } from '../services/excel.export.service';
import { take } from 'rxjs';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  allCases:any;
  @ViewChild('TABLE') table!: ElementRef | undefined;
  displayedColumns = ['fileNo', 'perviousDate','courtName', 'caseNo', 'partyName1', 'partyName2', 'caseStage', 'nextDate', 'remark', 'action'];
  dataSource!:any;
  filterDate!:any;
  backupData!:any;
  constructor(
    private afs : AngularFirestore,
    private _router : Router,
		private _matDialog: MatDialog,
    private _excelService : ExcelService
  ) { }

  ngOnInit(): void {
    
    this.loadData()
  }

  loadData(){
    const casesData = this.afs.collection('cases')
    casesData.valueChanges().subscribe((res)=>{
      this.backupData = res; 
      this.allCases = res.filter((item:any) => !item.isDeleted);
      this.dataSource = this.allCases;
      console.log(" this.dataSource",  this.dataSource);
      
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

  exportJson(): void {
    this._excelService.exportAsExcelFile(JSON.parse("jagdish seervi"), 'PeopleByCity');
  }

  onFilter(){
    if(!this.filterDate) return;
    
    const filteredArr = this.allCases.filter((item:any) => {
      const itemDate = new Date(item.nextDate);
      const inputDateObj = new Date(this.filterDate);
      // Check if the item's date matches the input date
      return (
        itemDate.getFullYear() === inputDateObj.getFullYear() &&
        itemDate.getMonth() === inputDateObj.getMonth() &&
        itemDate.getDate() === inputDateObj.getDate()
      );
    });

    this.dataSource = filteredArr;
  }
  resetFilter(){
    this.filterDate = null;
    this.dataSource = this.allCases;
  }

  onExport(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table ? this.table.nativeElement : null);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }

  logOut(){
    localStorage.clear();
    const payload = {
      userValid : false
    }
    const auth = this.afs.collection('auth').doc('0Bp2KfpGJGMTaRpXqlGO')
    auth.update(payload);
    this._router.navigate(['/auth/login'])
  }
}
