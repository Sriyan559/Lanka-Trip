<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class EcosystemCapabilityAssignment extends Model {
    use SoftDeletes;
    protected $fillable=['uuid','module_assignment_id','capability_id','assignment_type','status','governance_status','risk_level','production_eligible','eligibility_reasons','created_by','updated_by'];
    protected function casts(): array { return ['production_eligible'=>'boolean','eligibility_reasons'=>'array']; }
}
