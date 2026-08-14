<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class EcosystemModuleAssignment extends Model {
    use SoftDeletes;
    protected $fillable=['uuid','company_profile_id','business_unit_id','channel_id','ecosystem_module_id','environment','assignment_type','status','governance_status','risk_level','production_eligible','eligibility_reasons','effective_at','expires_at','created_by','updated_by'];
    protected function casts(): array { return ['production_eligible'=>'boolean','eligibility_reasons'=>'array','effective_at'=>'datetime','expires_at'=>'datetime']; }
    public function module(){return $this->belongsTo(EcosystemModule::class,'ecosystem_module_id');}
}
