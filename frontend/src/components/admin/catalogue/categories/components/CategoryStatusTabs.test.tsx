import {fireEvent,render,screen} from '@testing-library/react';
import {describe,expect,it,vi} from 'vitest';
import {CategoryStatusTabs} from './CategoryStatusTabs';

describe('CategoryStatusTabs',()=>{it('disables statuses without an authoritative count',()=>{const select=vi.fn();render(<CategoryStatusTabs tabs={[{id:'active',label:'Active',count:4},{id:'draft',label:'Draft',count:null}]} activeTabId="active" onSelectTab={select}/>);expect(screen.getByRole('button',{name:/Draft/})).toBeDisabled();fireEvent.click(screen.getByRole('button',{name:/Active/}));expect(select).toHaveBeenCalledWith('active');expect(screen.getByText('N/A')).toBeInTheDocument();});});
