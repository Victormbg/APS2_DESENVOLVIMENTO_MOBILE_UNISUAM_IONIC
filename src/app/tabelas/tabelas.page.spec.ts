import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelasPage } from './tabelas.page';

describe('TabelasPage', () => {
  let component: TabelasPage;
  let fixture: ComponentFixture<TabelasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabelasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
